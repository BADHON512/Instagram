import React from 'react'
import RouteProfileHomePage from './_page'
import { GetUser } from '@/@actions/user/getUser'


type Props = {}

const page = async(props: Props) => {

     const userData= await GetUser()


  return (
    <RouteProfileHomePage userData={userData}/>
  )
}

export default page