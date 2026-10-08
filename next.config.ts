import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ylxeydwmwbwbebujkeyi.supabase.co",
      },
      {
        protocol: "https",
        hostname: "nsosypdtxdoeiszilpwj.supabase.co",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/lankar/privacy-policy",
        destination: "/lankar/privacy-policy/index.html",
      },
      {
        source: "/lankar/terms",
        destination: "/lankar/terms/index.html",
      },
      {
        source: "/lankar/delete-account",
        destination: "/lankar/delete-account/index.html",
      },
    ];
  },
};

export default nextConfig;
