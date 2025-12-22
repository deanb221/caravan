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
      'res.cloudinary.com', // For uploaded images
    ],
    // Allow images to be loaded from any referrer
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Ensure images work when accessed via Google
    unoptimized: false,
  },
  // Add headers to allow images to be loaded from any referrer
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',
          },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

