/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    domains: ['localhost', 'ia-recrutement-pro.francoform.com'],
  },
  serverExternalPackages: ['@supabase/supabase-js', '@supabase/realtime-js'],
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  }
}

module.exports = nextConfig