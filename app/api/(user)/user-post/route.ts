import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();

    // Cookies থেকে user ডাটা নাও
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // JSON parse করে session ডাটা থেকে id বের করা
    const userData = JSON.parse(sessionCookie);
    const userId = userData.id;

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    // ইমেজ আপলোড হবে শুধু তখনই, যখন সব কিছু ঠিক থাকবে
    const image = await cloudinary.uploader.upload(data.image, {
      folder: "instagram-clone-photos",
    });

    const userPost = await prisma.post.create({
      data: {
        caption: data.caption,
        image: {
          public_id: image.public_id, 
          url: image.secure_url,
        },
        userId: userId,
      },
    });

    return NextResponse.json({ userPost ,message:"Post created successfully"}, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
