/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@kana/ui", "@kana/types", "@kana/config"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
