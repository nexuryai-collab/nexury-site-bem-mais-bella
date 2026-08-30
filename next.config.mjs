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
};

// ES module export
export default nextConfig;
