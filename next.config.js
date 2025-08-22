/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  serverExternalPackages: ['@supabase/supabase-js', '@supabase/realtime-js'],
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js', '@supabase/realtime-js']
  }
}

module.exports = nextConfig