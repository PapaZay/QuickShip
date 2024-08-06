import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{hostname: "images.unsplash.com"}, {hostname: "plus.unsplash.com"}, {hostname: "lh3.googleusercontent.com"}, {hostname: "unsplash.com"}]
        
    },
};

export default nextConfig;
