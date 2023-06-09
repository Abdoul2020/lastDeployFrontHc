/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },

    webpack5: true,

    webpack: (config) => {

        config.resolve.fallback = { fs: false, path: false };

        return config;

    },

}


module.exports = nextConfig