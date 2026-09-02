/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages Optimization
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

const isStaticExport = process.env.NODE_ENV === "production" && !process.env.NEXT_PREVIEW;

if (isStaticExport) {
  console.log("[CONFIG] Generating static export for Cloudflare Pages");
}

export default nextConfig;