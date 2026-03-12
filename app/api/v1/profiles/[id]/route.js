import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";

// GET /api/v1/profiles/[id] - Get a single profile
export async function GET(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const profile = await prisma.profile.findFirst({
      where: { id: params.id, user_id: user.id, deleted_at: null },
      include: {
        experiences: { where: { deleted_at: null } },
        skills: true,
        education: { where: { deleted_at: null } },
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("GET profile by id error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// PUT /api/v1/profiles/[id] - Update profile
export async function PUT(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const data = await req.json();
    const { full_name, title, summary, email, phone, location, linkedin_url, portfolio_url, is_default } = data;

    // Verify ownership
    const existing = await prisma.profile.findFirst({
      where: { id: params.id, user_id: user.id, deleted_at: null },
    });

    if (!existing) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Handle default logic
    if (is_default && !existing.is_default) {
      await prisma.profile.updateMany({
        where: { user_id: user.id, is_default: true },
        data: { is_default: false },
      });
    }

    const updated = await prisma.profile.update({
      where: { id: params.id },
      data: {
        full_name: full_name !== undefined ? full_name : existing.full_name,
        title: title !== undefined ? title : existing.title,
        summary: summary !== undefined ? summary : existing.summary,
        email: email !== undefined ? email : existing.email,
        phone: phone !== undefined ? phone : existing.phone,
        location: location !== undefined ? location : existing.location,
        linkedin_url: linkedin_url !== undefined ? linkedin_url : existing.linkedin_url,
        portfolio_url: portfolio_url !== undefined ? portfolio_url : existing.portfolio_url,
        is_default: is_default !== undefined ? !!is_default : existing.is_default,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT profile error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

// DELETE /api/v1/profiles/[id] - Soft delete profile
export async function DELETE(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    // Verify ownership
    const existing = await prisma.profile.findFirst({
      where: { id: params.id, user_id: user.id, deleted_at: null },
    });

    if (!existing) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    await prisma.profile.update({
      where: { id: params.id },
      data: { deleted_at: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE profile error:", error);
    return NextResponse.json({ error: "Failed to delete profile" }, { status: 500 });
  }
}
