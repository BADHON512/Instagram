"use server"
import cloudinary from "@/lib/cloudinary"
import prisma from "@/lib/prismaDb"
import { cookies } from "next/headers"




export async function UpdateProfile(avatar:string){
    try {
        console.log(avatar)
        const cookie=await cookies()
        const session=cookie.get("session")?.value
        if(!session){
            return {error:"User not authenticated"}
        }
     
        const userId=session
        const oldPicture = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                avatar: true,
            },
        });
        
        // Parse the avatar JSON if necessary
        const avatarData = oldPicture?.avatar && typeof oldPicture.avatar === "string" 
        ? JSON.parse(oldPicture.avatar) 
        : oldPicture?.avatar;
    
        
        if (avatarData?.public_id) {
            await cloudinary.uploader.destroy(avatarData.public_id);
        }
        
        const image = await cloudinary.uploader.upload(avatar, {
          folder: "instagram-clone-photos",
        });
    
        const user=await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                avatar:{
                    url:image.secure_url,
                    public_id:image.public_id
                }
            
        }
        })
        return {message:"Profile update successful"}
    } catch (error) {
        return {error}
    }
}