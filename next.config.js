/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",          // generates a fully-static `out/` directory
  trailingSlash: true,       // Netlify prefers /page/ over /page
  images: { unoptimized: true }, // static export doesn't support Next.js Image Optimization
};

module.exports = nextConfig;
