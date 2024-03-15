/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    eslint: {
        dirs: ["app", "pages"]
    }
};

export default nextConfig;
