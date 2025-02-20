import React from 'react';
import Home from './_page';

import { GetUser } from '@/@actions/user/getUser';
import { GetAllPost } from '@/@actions/GetAllPost/GetAllPost';

const RoutePage = async () => {
 const   getUser:any=await GetUser()
 const Posts=await GetAllPost()

  return (
    <div>
      <Home user={getUser?.user} Posts={Posts?.posts} />
    </div>
  );
};

export default RoutePage;
