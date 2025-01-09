/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, ''); // Extract repo name
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig = {
  output: 'export', // Static export
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

export default nextConfig;
