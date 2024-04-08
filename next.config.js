/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Use remotePatterns instead of domains
        // Specify each pattern with a protocol and a domain
        remotePatterns: [
            { protocol: 'http', hostname: 'localhost' },
            { protocol: 'http', hostname: 'cdn.example.com' },
            { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
            { protocol: 'https', hostname: 'googleusercontent.com' }
        ]
    }
};

module.exports = nextConfig;
