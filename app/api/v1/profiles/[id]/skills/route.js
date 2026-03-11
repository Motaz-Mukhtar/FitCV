import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";

// GET /api/v1/profiles/[id]/skills - List skills for a profile
export async function GET(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const skills = await prisma.skill.findMany({
      where: {
        profile_id: params.id,
        profile: { user_id: user.id },
      },
      orderBy: { created_at: "asc" },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error("GET skills error:", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

// POST /api/v1/profiles/[id]/skills - Create new skill
export async function POST(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const data = await req.json();
    const { name, type } = data; // type: 'hard' | 'soft'

    if (!name || !type) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // Verify profile ownership
    const profile = await prisma.profile.findFirst({
      where: { id: params.id, user_id: user.id, deleted_at: null },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const skill = await prisma.skill.create({
      data: {
        profile_id: params.id,
        name,
        type,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("POST skill error:", error);
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
