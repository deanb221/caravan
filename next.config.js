/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      'images.unsplash.com',
      'm.atcdn.co.uk',
      'www.ballynesscaravanpark.com',
      'www.gdoni.blog',
      'www.dundonaldcaravanpark.com',
      'nt.global.ssl.fastly.net',
      'getactiveabc.com',
    ],
  },
}

module.exports = nextConfig

