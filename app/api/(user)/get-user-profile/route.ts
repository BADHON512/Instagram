import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const getCookie = await cookies();
    const session = getCookie.get("session")?.value;
    if (!session) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const userData = JSON.parse(session);
    const userId = userData.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        bio: true,
        avatar: true,
        createdAt: true,
        posts: true,
        followers: true,
        following: true,
        // Add other user fields you need here
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
