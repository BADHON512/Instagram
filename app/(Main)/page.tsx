import React from 'react';
import Home from './_page';
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';

const RoutePage = async () => {
  

  return (
    <div>
      <Home />
    </div>
  );
};

export default RoutePage;
