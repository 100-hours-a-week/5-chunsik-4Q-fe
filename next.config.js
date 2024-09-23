import withAntdLess from 'next-plugin-antd-less';
import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = withAntdLess({
    reactStrictMode: true,
    swcMinify: false,
    assetPrefix: '',
    experimental: { esmExternals: true },
    images: {
        domains: ['api.qqqq.world'], 
      },
    env: {
        NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    transpilePackages: ['antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-notification', 'rc-tooltip'],
    webpack: (config) => {
        config.infrastructureLogging = { debug: /PackFileCache/ };
        config.resolve.alias.canvas = false;
        config.cache = false;

        if (!dev && !process.env.GENERATE_SOURCEMAP) {
            config.devtool = false; 
        }
        
        config.module.rules.push({
            test: /\.node$/,
            use: 'raw-loader',
        });

        return config;
    },
    productionBrowserSourceMaps: process.env.GENERATE_SOURCEMAP !== 'false',
});

const sentryConfig = {
    org: "chulchulhanchunsigi",
    project: "pq-fe", 
    silent: !process.env.CI,
    widenClientFileUpload: true,
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
};

export default withSentryConfig(nextConfig, sentryConfig);
