import { NextResponse } from "next/server";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";
import prisma from "@/shared/lib/prisma";

export async function GET(request) {
  try {
    // Authenticate user
    const user = await authMiddleware(request);
    if (!user) {
      return unauthorizedResponse();
    }

    // Get user details with profile count
    const userDetails = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        created_at: true,
        _count: {
          select: {
            profiles: true,
            submissions: true,
            documents: true,
          }
        }
      }
    });

    if (!userDetails) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userDetails.id,
        email: userDetails.email,
        created_at: userDetails.created_at,
        stats: {
          profiles: userDetails._count.profiles,
          submissions: userDetails._count.submissions,
          documents: userDetails._count.documents,
        }
      }
    });

  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}