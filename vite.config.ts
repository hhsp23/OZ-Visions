import vinext from "vinext";
import { defineConfig } from "vite";

const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "OZ-Visions";
const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  base: isGitHubPages ? `/${repositoryName}/` : "/",
  plugins: [vinext()],
});
