import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "dsfzqjbtjytmzgmfgtbh.supabase.co",
      },
    ],
  },
};

export default nextConfig;
