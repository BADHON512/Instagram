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
        const alluser=await prisma.user.findMany()

    const users= alluser.filter((user)=>user.id!==session)
    return {users,statusCode:200}
    } catch (error) {
        return {error,statusCode:500}
    }
}