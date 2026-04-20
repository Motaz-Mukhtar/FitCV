import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";

// GET /api/v1/profiles/[id]/experiences - List experiences for a profile
export async function GET(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const { id } = await params; // Await params
    
    const experiences = await prisma.experience.findMany({
      where: {
        profile_id: id,
        profile: { user_id: user.id },
        deleted_at: null,
      },
      orderBy: { start_date: "desc" },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error("GET experiences error:", error);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

// POST /api/v1/profiles/[id]/experiences - Create new experience
export async function POST(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const { id } = await params; // Await params
    const data = await req.json();
    const { company, role, start_date, end_date, description } = data;

    if (!company || !role || !start_date) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // Verify profile ownership
    const profile = await prisma.profile.findFirst({
      where: { id, user_id: user.id, deleted_at: null },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const experience = await prisma.experience.create({
      data: {
        profile_id: id,
        company,
        role,
        start_date: new Date(start_date),
        end_date: end_date ? new Date(end_date) : null,
        description,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("POST experience error:", error);
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
