import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/auth/linkedin/callback`;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/profiles?error=linkedin_auth_failed`);
    }

    if (!code || !state) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/profiles?error=missing_parameters`);
    }

    // Parse state to get user and profile info
    const { userId, profileId } = JSON.parse(state);

    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        redirect_uri: LINKEDIN_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch user profile using OpenID Connect (always available)
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    console.log('Profile Response Status:', profileResponse.status);

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.error('LinkedIn profile fetch error:', errorText);
      throw new Error(`Failed to fetch LinkedIn profile: ${profileResponse.status} ${errorText}`);
    }

    const linkedinProfile = await profileResponse.json();
    console.log('LinkedIn Profile Data:', linkedinProfile);

    // Remove the separate email fetch since OpenID Connect includes email
    // The userinfo endpoint provides: sub, name, given_name, family_name, email, picture

    // Transform LinkedIn data to our format (OpenID Connect format)
    const profileData = {
      full_name: linkedinProfile.name || `${linkedinProfile.given_name || ''} ${linkedinProfile.family_name || ''}`.trim(),
      email: linkedinProfile.email || '',
      linkedin_url: `https://www.linkedin.com/in/${linkedinProfile.sub}`, // sub is the LinkedIn ID
    };

    // Update the profile in database
    await prisma.profile.update({
      where: { 
        id: profileId,
        user_id: userId // Ensure user owns this profile
      },
      data: profileData,
    });

    console.log('Profile updated successfully with LinkedIn data');

    console.log('Profile updated successfully with LinkedIn data');

    // Note: Additional data like positions, education, and skills require 
    // special LinkedIn partner permissions that are not available for most apps.
    // For now, we only import basic profile information.

    // Redirect back to profile page with success message
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/profiles/${profileId}?success=linkedin_imported`);

  } catch (error) {
    console.error("LinkedIn callback error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/profiles?error=linkedin_import_failed`);
  }
}