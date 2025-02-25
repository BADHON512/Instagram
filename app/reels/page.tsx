import React from 'react'
import HomeReels from './_page'
import { getInstagramReels } from '@/@actions/getReels';
import { GetUser } from '@/@actions/user/getUser';

type Props = {}

const Page = async(props: Props) => {
const currentUser:any = await GetUser()
  return (
   <HomeReels currentUser={currentUser?.user}/>
  )
}

export default Page