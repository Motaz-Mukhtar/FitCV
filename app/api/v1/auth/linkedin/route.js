import { NextResponse } from "next/server";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";

// LinkedIn OAuth configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/auth/linkedin/callback`;

export async function GET(request) {
  try {
    // Authenticate user
    const user = await authMiddleware(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId');

    if (!profileId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 }
      );
    }

    // Generate LinkedIn OAuth URL
    const state = JSON.stringify({ userId: user.id, profileId });
    const scope = 'openid profile email'; // OpenID Connect scopes only

    console.log('LinkedIn OAuth Config:', { 
      clientId: LINKEDIN_CLIENT_ID ? 'Set' : 'Missing',
      clientSecret: LINKEDIN_CLIENT_SECRET ? 'Set' : 'Missing',
      redirectUri: LINKEDIN_REDIRECT_URI,
      scope 
    });

    const linkedinAuthUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
    linkedinAuthUrl.searchParams.append('response_type', 'code');
    linkedinAuthUrl.searchParams.append('client_id', LINKEDIN_CLIENT_ID);
    linkedinAuthUrl.searchParams.append('redirect_uri', LINKEDIN_REDIRECT_URI);
    linkedinAuthUrl.searchParams.append('state', state);
    linkedinAuthUrl.searchParams.append('scope', scope);

    return NextResponse.json({
      success: true,
      authUrl: linkedinAuthUrl.toString()
    });

  } catch (error) {
    console.error("LinkedIn OAuth initiation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}