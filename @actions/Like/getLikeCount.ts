"use server";
import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";

export async function GetLikeCount(postId: string) {
  try {

    const getCookie = await cookies();
    const userId= getCookie.get("session")?.value;
    if (!postId) {
      return { message: "Post id is required", statusCode: 400 };
      
    }

    const likes = await prisma.like.findMany({
      where: { 
        postId, 
      userId},
      
    });
  
    const likeExist= likes.find((like)=>like.userId===userId)

    
    const likeCount = await prisma.like.count({
      where: {
        postId: postId,
      },
    
    });
   


    if (!likeCount) {
      return { message: "No like found", statusCode: 404 };
    }
    return { likeCount,likeExist, statusCode: 200, message: "Like count found" };
  } catch (error) {
    return { error, message: "Internal server error", statusCode: 500 };
  }
}
