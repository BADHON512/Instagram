import React from 'react';
import Home from './_page';

import { GetUser } from '@/@actions/user/getUser';
import { GetAllPost } from '@/@actions/GetAllPost/GetAllPost';
import { GetAllUser } from '@/@actions/user/getAllUser';

const RoutePage = async () => {
 const   getUser:any=await GetUser()
 const Posts=await GetAllPost()
 const users=await GetAllUser()

  return (
    <div>
      <Home user={getUser?.user} Posts={Posts?.posts} users={users?.users} />
    </div>
  );
};

export default RoutePage;
