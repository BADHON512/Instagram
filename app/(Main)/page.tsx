import React from 'react';
import Home from './_page';

import { GetUser } from '@/@actions/user/getUser';
import { GetAllPost } from '@/@actions/GetAllPost/GetAllPost';
import { GetAllUser } from '@/@actions/user/getAllUser';
import { GetAllStories } from '@/@actions/Stories/getAllStories';

const RoutePage = async () => {
 const   getUser:any=await GetUser()
 const Posts=await GetAllPost()
 const users=await GetAllUser()
 const stories=await GetAllStories()

  return (
    <div>
      <Home user={getUser?.user} Posts={Posts?.posts} users={users?.users} stories={stories?.stories} />
    </div>
  );
};

export default RoutePage;
