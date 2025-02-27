
"use server"

import prisma from "@/lib/prismaDb"
import { cookies } from "next/headers"

 type Props={
    postId:string,
  
    content:string,
  
 }
export async function CreateComment({postId,content}:Props) {

    try {
        const getCookie=await cookies()
        const userId= getCookie.get("session")?.value
        if(!userId) return {error:"You must be logged in to like a post",message:"Unauthorized",statusCode:401}

        const comment=await prisma.comment.create(({
            data:{
                userId:userId,
                postId:postId,
                text:content
            }
        }))

        if(!comment) return {error:"Something went wrong",message:"Internal server error",statusCode:500}

        return {comment,message:"Comment created successfully",statusCode:200,success:true}
    } catch (error) {
        return {error,message:"Internal server error" ,statusCode:500}
    }
    
}