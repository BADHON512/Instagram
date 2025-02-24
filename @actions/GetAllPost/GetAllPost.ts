"use server"
import prisma from "@/lib/prismaDb"


export async function GetAllPost (){
    try {
        const posts=await prisma.post.findMany({
            include:{
                user:true,
                comments:true,
                likes:true,
                SavePost:true,

            }
        })
        return {posts,statusCode:200}
    } catch (error) {
        return{ error,statusCode:500}
    }
}