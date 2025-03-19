/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Eliminamos swcMinify ya que parece estar causando problemas
    images: {
        domains: ['same-assets.com', 'localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    // También eliminamos la opción experimental que podría no ser soportada
}

module.exports = nextConfig