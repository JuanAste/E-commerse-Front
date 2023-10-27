/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },
  env: {
    SERVICE_EMAIL_ID: process.env.SERVICE_EMAIL_ID,
    TEMPLATE_EMAIL_ID: process.env.TEMPLATE_EMAIL_ID,
    PUBLIC_KEY_EMAIL: process.env.PUBLIC_KEY_EMAIL,
  },
};

module.exports = nextConfig;
