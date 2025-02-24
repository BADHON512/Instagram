"use server";
import prisma from "@/lib/prismaDb";

export async function GetAllStories() {
  try {
    const stories = await prisma.story.findMany({
      select: {
        id: true,
        image: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // সর্বশেষ স্টোরি আগে দেখাবে
      },
    });

    return { stories, statusCode: 200, success: true };
  } catch (error) {
    console.error("Error fetching stories:", error);
    return { error: error.message || "Internal server error", statusCode: 500 };
  }
}
