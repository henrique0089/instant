/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '3333-henrique998-instant-edbtw68qswi.ws-us106.gitpod.io',
      },
    ],
  },
}

module.exports = nextConfig
