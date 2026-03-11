import { NextResponse } from "next/server";
import { verify } from "@/shared/utils/jwt";
import prisma from "@/shared/lib/prisma";

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

export async function authMiddleware(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1] || req.cookies.get("token")?.value;

    if (!token) {
      if (process.env.NODE_ENV === "development") {
        // Ensure mock user exists in the DB to satisfy foreign keys
        await prisma.user.upsert({
          where: { id: MOCK_USER_ID },
          update: {},
          create: {
            id: MOCK_USER_ID,
            email: "mock@fitcv.com",
            password_hash: "mock_hash",
          },
        });
        return { id: MOCK_USER_ID };
      }
      return null;
    }

    const payload = await verify(token);
    return payload;
  } catch (error) {
    console.error("Auth verification failed:", error);
    return null;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
