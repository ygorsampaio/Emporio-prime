/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domínios externos permitidos para next/image
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
}

export default nextConfig
