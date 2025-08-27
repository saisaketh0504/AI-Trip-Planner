import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains: [
      "places.googleapis.com",      // Google Places Photos
      "encrypted-tbn0.gstatic.com", // Google thumbnails
      "dummyimage.com",  
      "images.unsplash.com",        // Your dummy hotel/place images
      "i.pinimg.com",
      "images.pexels.com"
    ],
  }
};

export default nextConfig;
