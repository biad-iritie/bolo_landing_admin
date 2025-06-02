/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3500";
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; connect-src 'self' ${apiUrl}; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
