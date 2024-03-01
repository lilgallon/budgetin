/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    AUTH0_DOMAIN : process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
  }
}

export default nextConfig
