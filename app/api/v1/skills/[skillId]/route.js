import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";

// DELETE /api/v1/skills/[skillId] - Delete a skill
export async function DELETE(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const { skillId } = await params; // Await params

    // Verify ownership through profile
    const skill = await prisma.skill.findFirst({
      where: {
        id: skillId,
        profile: { user_id: user.id },
      },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    await prisma.skill.delete({
      where: { id: skillId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE skill error:", error);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}