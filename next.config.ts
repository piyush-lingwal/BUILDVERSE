import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    qualities: [75, 85, 90],
  },
  async redirects() {
    return [
      {
        source: "/register",
        destination: "https://docs.google.com/forms/d/e/1FAIpQLSfvXQBNtTPuO_nf2rJ2lQ3YXtIHAKX1KfoFGr9vQtW7z5-KXQ/viewform",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
