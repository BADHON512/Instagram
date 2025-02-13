import React from 'react'
import Home from './_page'
import { currentUser } from '@clerk/nextjs/server'
import axios from 'axios'



const RoutePage =async () => {

  const user: any = await currentUser()
//   const data={
//     name:user.name,
//     username:user.username,
//     email:user.emailAddresses[0].emailAddress,
//     image:user.imageUrl,
//     bio:""
//   }
//   if(!user){
//     return <div>Not logged in</div>
//   }
//   if(user.id){
//  axios.post("http://localhost:3000/api/me",{data}).then((res=>alert("working"))).catch((error)=>alert(error))
  
//   }
//   console.log(user?.imageUrl)
  return (
    <div><Home user={user}/></div>
  )
}

export default RoutePage