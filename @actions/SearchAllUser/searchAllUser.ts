"use server"

import prisma from "@/lib/prismaDb"



export async function SearchUsers(query:string) {
    if(!query) return {error:"Query is required",success:false, statusCode:400}
    
    try {
      const users=await prisma.user.findMany({
        where:{
            OR:[
                {name:{contains:query,mode:"insensitive"}},
                {username:{contains:query,mode:"insensitive"}}
            ]
        },
        select:{
            id:true,
            name:true,
            username:true,
            avatar:true,
           
        },
        take:10
      })  

      return {users,success:true, statusCode:200}
    } catch (error) {
       return {error:error||"Internal Server error",success:false, statusCode:500} 
    }
}