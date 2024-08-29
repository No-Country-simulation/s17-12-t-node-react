/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
            },
            {
                protocol: 'https',
                hostname: 'glampinglacepa.co',
            },
            {
                protocol: 'https',
                hostname: 'www.mibauldeblogs.com',
            },
            {
                protocol: 'https',
                hostname: 'media.tacdn.com',
            },
            {
                protocol: 'https',
                hostname: 'apassionandapassport.com',
            },
            {
                protocol: 'https',
                hostname: 'guiaparamochileros.com',
            },
        ],
    },
};

export default nextConfig;
