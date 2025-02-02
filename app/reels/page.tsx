import React from 'react'
import HomeReels from './_page'
import { getInstagramReels } from '@/@actions/getReels';

type Props = {}

const Page = async(props: Props) => {
  // const ACCESS_TOKEN='IGAASrP3jlqd9BZAE5yNEh1VUMzVXM4b2VTUVhpQ0lrVHV3Ql8yX2g1elBWR3lUcnBYUWtzbGhYMGZAjSGhjdGhKNnJ1Y1dMdmtTV1lFZA3J4T2pBOWlOa24zS2pOVVFrSVZAwT0ZAsUUJ2NUs5Y19uaXM1OVFJZAFBpY2lnV3NuMXBrMAZDZD'


  //     const data = await getInstagramReels();
  //     console.log(data)



  return (
   <HomeReels/>
  )
}

export default Page