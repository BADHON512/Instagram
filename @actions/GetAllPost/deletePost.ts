"use server"

import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";



export async function DeletePost(postId:string) {
    try {
        console.log(postId)
        const getCookie= await cookies()
        const userId= getCookie?.get("session")?.value
        console.log(userId)
        const deletedPost = await prisma.post.delete({
            where: { id: postId },
          });
          return { success: true, message: "Post deleted successfully." };
    } catch (error) {
       
        return { success: false, message: "Failed to delete post." };
    }
}