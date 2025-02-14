import prisma from "@/lib/prismaDb";
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get auth session
    const { userId } = await auth();

    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await req.json();

    // Create user in your database with Clerk userId
    const user = await prisma.user.create({
      data: {
     
        name: userData.name,
        username: userData.username,
        email: userData.email,
      }
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}