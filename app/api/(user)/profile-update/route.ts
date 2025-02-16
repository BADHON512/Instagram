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

    const user = JSON.parse(getUser);
    const userId = user.id;

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }
    const oldPicture = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            avatar: true,
        },
    });
    
    // Parse the avatar JSON if necessary
    const avatarData = oldPicture?.avatar && typeof oldPicture.avatar === "string" 
    ? JSON.parse(oldPicture.avatar) 
    : oldPicture?.avatar;

    
    if (avatarData?.public_id) {
        await cloudinary.uploader.destroy(avatarData.public_id);
    }
    
    const image = await cloudinary.uploader.upload(data?.image, {
      folder: "instagram-clone-photos",
    });

    // Update user data in the database
    const updataUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: {
          public_id: image.public_id,
          url: image.secure_url,
        },
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
