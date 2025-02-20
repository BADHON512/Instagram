import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const jsonUserid = await cookies();
    const getUser = jsonUserid.get("session")?.value;

    if (!getUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

  
    const userId =getUser

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    // Update user data in the database
    const updataUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
 
        bio: data?.bio,
        gender: data?.gender,
      },
    });

    return NextResponse.json(
      {
        updataUser,
        message: "Profile update successful",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
