import prisma from "@/lib/prismaDb";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest,res:NextResponse){
    try {
        const userData =await req.json()
        console.log(userData.email)
        const user=await prisma.user.findUnique({
            where:{
                email:userData.email,
            }
        })
        if(!user){
            return NextResponse.json({error:"User not found"},{status:404})
        }

        const passwordMatch= await bcrypt.compare(userData.password, user.password as string)
        if(!passwordMatch){
            return NextResponse.json({error:"Invalid password"}, {status:401})
        }

        
        const response = NextResponse.json({ message: "Login successful" });

        // Step 7: Set the cookie with a session token or user identifier
        response.cookies.set("session", JSON.stringify(user), {
          httpOnly: true,       // Prevents JavaScript access to the cookie (security)
          sameSite: "lax",      // Cookies will be sent with cross-site requests
          maxAge: 3600,         // 1 hour (set the expiration as needed)
          path: "/",            // Cookie is available for the whole site
        });
    
      
        return response
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}