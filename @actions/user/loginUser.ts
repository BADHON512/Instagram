"use server"
import { cookies } from 'next/headers';
import prisma from "@/lib/prismaDb";
import bcrypt from "bcryptjs";

export async function loginUser(email: string, password: string) {
    try {
        console.log(email, password);
        
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            return { error: "User not found", status: 404,success:false };
        }

        console.log(user);

        const passwordMatch = await bcrypt.compare(password, user.password as string);
        if (!passwordMatch) {
            return { error: "Invalid password", status: 401,success:false };
        }

        // ✅ `cookies()` কে await করা হয়েছে
        const cookieStore =await cookies(); 

        // ✅ কুকি সেট করা
        cookieStore.set("session", user.id, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 3600*24*7,
            path: "/",
        });

        // ✅ শুধুমাত্র একটি প্লেইন অবজেক্ট রিটার্ন করা হয়েছে
        return { success: true, message: "Login successful" };

    } catch (error) {
        console.log(error);
        return { error: "Internal server error", status: 500,success:false };
    }
}
