/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'localhost',
        'cdn.example.com',
        'firebasestorage.googleapis.com',
        'googleusercontent.com',
      ],
    },
  };
  
  module.exports = nextConfig;