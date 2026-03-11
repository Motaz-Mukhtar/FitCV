import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";

export async function GET(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const document = await prisma.generatedDocument.findFirst({
      where: { id: params.id, user_id: user.id },
      include: {
        submission: {
          include: {
            profile: true
          }
        }
      }
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error("GET generated document error:", error);
    return NextResponse.json({ error: "Failed to fetch generated document" }, { status: 500 });
  }
}
