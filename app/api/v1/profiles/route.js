import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";

// GET /api/v1/profiles - List all profiles for user
export async function GET(req) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const profiles = await prisma.profile.findMany({
      where: { user_id: user.id, deleted_at: null },
      orderBy: { created_at: "desc" },
      include: {
        experiences: { where: { deleted_at: null } },
        skills: true,
      },
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error("GET profiles error:", error);
    return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 });
  }
}

// POST /api/v1/profiles - Create new profile
export async function POST(req) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const data = await req.json();
    const { name, title, summary, is_default } = data;

    if (!name) {
      return NextResponse.json({ error: "Profile name is required" }, { status: 400 });
    }

    // If setting as default, unset previous default
    if (is_default) {
      await prisma.profile.updateMany({
        where: { user_id: user.id, is_default: true },
        data: { is_default: false },
      });
    }
    console.log(user);
    const profile = await prisma.profile.create({
      data: {
        user_id: user.id,
        name,
        title,
        summary,
        is_default: !!is_default,
      },
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error("POST profile error:", error);
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
}
