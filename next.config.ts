import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const nextConfig: NextConfig = {
  images: {
    unoptimized: isGitHubPages,
  },
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
};

export default nextConfig;
