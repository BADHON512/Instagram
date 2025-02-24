"use server"
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";

type Props = {
  avatar: string; // এটি Base64 URL হলে চেক করো
};

export async function StoriesCreate( {avatar} : Props) {
  try {
    console.log(avatar)
    const userCookie = await cookies()
    const userid=userCookie.get("session")?.value;
    if (!userid) {
      return { error: "User not authenticated", message: "Unauthorized", statusCode: 401 };
    }

    // Cloudinary তে ইমেজ আপলোড
    const uploadedImage = await cloudinary.uploader.upload(avatar, {
      folder: "instagram-clone-stories",
    });

    if (!uploadedImage) {
      return { error: "Error uploading image", message: "Upload failed", statusCode: 500 };
    }

    // স্টোরি ডাটাবেজে সংরক্ষণ
    const story = await prisma.story.create({
      data: {
        userId: userid,
        image: {
          url: uploadedImage.secure_url,
          public_id: uploadedImage.public_id,
        },
      },
    });

    return { story, statusCode: 200, success: true ,message:"Story create successful" };
  } catch (error) {
    console.error("Error creating story:", error);
    return { error: error.message || "Internal server error", message: "Something went wrong", statusCode: 500 };
  }
}
