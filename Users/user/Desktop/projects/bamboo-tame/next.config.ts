/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        // Allow user avatars from GitHub
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        // Allow user avatars from Google
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      }
    ],
  },
};

export default nextConfig;
