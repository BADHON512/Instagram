"use server"
import prisma from "@/lib/prismaDb"
import { cookies } from "next/headers"


export async function GetAllUser() {
    try {
        const userId=await cookies()
        const session=userId.get("session")?.value
        if(!session){
            return {error:"User not authenticated",statusCode:401}
        }
        const alluser=await prisma.user.findMany({
            include:{
                followers:true,
                following:true,

            
            }
        })

    const removeLoginUser= alluser.filter((user)=>user.id!==session)
    const updataUser =removeLoginUser.filter((user)=>!user.followers.some((follower)=>follower.followerId===session))
     const followSuggestUser= updataUser.slice(0,5)
    return {followSuggestUser,statusCode:200}
    } catch (error) {
        return {error,statusCode:500}
    }
}