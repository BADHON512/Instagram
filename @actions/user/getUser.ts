"use server";
import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";

export const GetUser = async () => {
  try {
    const getCookie = await cookies();
    const session = getCookie.get("session")?.value;
    if (!session) {
      return { error: "User not authenticated" };
    }

    const userId = session;

    const user = await prisma.user.findUnique({
      omit: { password: false },
      where: {
        id: userId,
      },
      include: {
        posts: {
          include:{
            comments:{
              include:{
                user:true
              }
            },
          
          }
        },
        followers: true,
        following: true,
        comments: true,
        likes: true,
        savePost: {
          include: {
            post: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    return { user, statusCode: 200 };
  } catch (error) {
    return error;
  }
};
