import React from 'react'
import HomeExplore from './_page'
import { GetUser } from '@/@actions/user/getUser'
import { GetAllPost } from '@/@actions/GetAllPost/GetAllPost'

type Props = {}

const page = async (props: Props) => {
 const Posts:any=await GetAllPost()
  const currentUser:any = await GetUser()

  return (
    <div>
       <HomeExplore currentUser={currentUser?.user} Posts={Posts?.posts}/>
    </div>
  )
}

export default page