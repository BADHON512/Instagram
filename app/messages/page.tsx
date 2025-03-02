import React from 'react'
import MessagesHome from './_page'
import { GetUser } from '@/@actions/user/getUser'
import { GetFollower } from '@/@actions/Follow/getFollower'

type Props = {}

const page = async(props: Props) => {
  const currentUser:any=await GetUser()
  const Follower:any=await GetFollower()

  return (
    <div>
        <MessagesHome currentUser={currentUser.user} follower={Follower.follower?.followers}/>
    </div>
  )
}

export default page