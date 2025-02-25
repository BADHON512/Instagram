import React from 'react'
import MessagesHome from './_page'
import { GetUser } from '@/@actions/user/getUser'

type Props = {}

const page = async(props: Props) => {
  const currentUser:any=await GetUser()
  return (
    <div>
        <MessagesHome currentUser={currentUser.user}/>
    </div>
  )
}

export default page