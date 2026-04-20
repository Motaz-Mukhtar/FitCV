import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";

// GET /api/v1/profiles/[id]/skills - List skills for a profile
export async function GET(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const { id } = await params; // Await params
    
    const skills = await prisma.skill.findMany({
      where: {
        profile_id: id,
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

// POST /api/v1/profiles/[id]/skills - Create new skill(s)
export async function POST(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const { id } = await params; // Await params
    const data = await req.json();
    
    // Support both single skill and multiple skills
    const skills = Array.isArray(data) ? data : [data];

    // Validate all skills
    for (const skill of skills) {
      if (!skill.name || !skill.type) {
        return NextResponse.json({ error: "Each skill requires name and type" }, { status: 400 });
      }
    }

    // Verify profile ownership
    const profile = await prisma.profile.findFirst({
      where: { id, user_id: user.id, deleted_at: null },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Create all skills
    const createdSkills = await prisma.skill.createMany({
      data: skills.map(skill => ({
        profile_id: id,
        name: skill.name.trim(),
        type: skill.type,
      })),
    });

    return NextResponse.json({ 
      success: true, 
      count: createdSkills.count 
    }, { status: 201 });
  } catch (error) {
    console.error("POST skill error:", error);
    return NextResponse.json({ error: "Failed to create skill(s)" }, { status: 500 });
  }
}
