/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['hootswings.com']
  },
  env: {
    BACKEND_API: 'http://localhost:4000/graphql'
  }
}

module.exports = nextConfig
