import type { NextConfig } from "next";

const nextConfig: NextConfig = {
typescript:{
  ignoreBuildErrors:true
},
  experimental:{
    serverActions:true
  },
  eslint:{
    ignoreDuringBuilds:true
  },
  /* config options here */
  swcMinify: true,
  images:{
  domains:["res.cloudinary.com"]
  },
  
};

export default nextConfig;
