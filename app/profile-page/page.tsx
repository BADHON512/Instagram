import React from 'react'
import RouteProfileHomePage from './_page'
import { GetUser } from '@/@actions/user/getUser'


type Props = {}

const page = async(props: Props) => {

     const user= await GetUser()
 

  return (
    <RouteProfileHomePage user={user}/>
  )
}

export default page