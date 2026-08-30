/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages Optimization
  output: "export",
  // Image optimization via Cloudflare (not via next/image)
  images: {
    // Desabilitamos o next/image padrão para usar Cloudflare Mirage/Polish
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "",
    // Desabilitamos loader padrão
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Headers para Cloudflare
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Cloudflare Polish: otimiza imagens automaticamente
          {
            key: "Accept-Ch",
            value: "DPR, width, viewport-width",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

// ES module export
export default nextConfig