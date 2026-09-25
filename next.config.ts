import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Single page with native anchors: prefix assets, keep export route at /.
  assetPrefix:
    process.env.NODE_ENV === 'production' ? '/workshop-agentforce-vibes' : '',
  trailingSlash: true,
};

export default nextConfig;
