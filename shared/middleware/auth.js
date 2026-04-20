import { NextResponse } from "next/server";
import { verify } from "@/shared/utils/jwt";
import prisma from "@/shared/lib/prisma";

export async function authMiddleware(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1] || req.cookies.get("token")?.value;

    if (!token) {
      return null;
    }

    const payload = await verify(token);
    
    // Verify user still exists in database
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true }
    });

    if (!user) {
      return null;
    }

    return { id: user.id, email: user.email };
  } catch (error) {
    console.error("Auth verification failed:", error);
    return null;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
