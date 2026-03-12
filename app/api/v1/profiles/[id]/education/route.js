import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";

// GET /api/v1/profiles/[id]/education - List education for a profile
export async function GET(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const education = await prisma.education.findMany({
      where: {
        profile_id: params.id,
        profile: { user_id: user.id },
        deleted_at: null,
      },
      orderBy: { start_date: "desc" },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("GET education error:", error);
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}

// POST /api/v1/profiles/[id]/education - Create new education entry
export async function POST(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const data = await req.json();
    const { institution, degree, field, start_date, end_date } = data;

    if (!institution || !degree || !field || !start_date) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // Verify profile ownership
    const profile = await prisma.profile.findFirst({
      where: { id: params.id, user_id: user.id, deleted_at: null },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const education = await prisma.education.create({
      data: {
        profile_id: params.id,
        institution,
        degree,
        field,
        start_date: new Date(start_date),
        end_date: end_date ? new Date(end_date) : null,
      },
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error("POST education error:", error);
    return NextResponse.json({ error: "Failed to create education entry" }, { status: 500 });
  }
}
