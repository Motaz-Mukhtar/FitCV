import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";

export async function GET(req) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  try {
    const [submissions, total, docStats] = await Promise.all([
      prisma.jobSubmission.findMany({
        where: { user_id: user.id },
        orderBy: { created_at: "desc" },
        skip,
        take: limit,
        include: {
          documents: true,
          profile: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.jobSubmission.count({
        where: { user_id: user.id },
      }),
      prisma.generatedDocument.groupBy({
        by: ['type'],
        where: { user_id: user.id },
        _count: true,
      }),
    ]);

    const stats = {
      cv: docStats.find(s => s.type === 'cv')?._count || 0,
      cover_letter: docStats.find(s => s.type === 'cover_letter')?._count || 0,
      summary: docStats.find(s => s.type === 'summary')?._count || 0,
    };

    return NextResponse.json({
      submissions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      stats,
    });
  } catch (error) {
    console.error("GET submissions error:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
