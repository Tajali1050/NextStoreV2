export default {
  experimental: {
    useCache: true,
  },
  //  output: "export",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  transpilePackages: ["@heroui/react", "@heroui/dom-animation"],
};
