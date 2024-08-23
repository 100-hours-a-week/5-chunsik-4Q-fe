// import withAntdLess from 'next-plugin-antd-less';
//
// /** @type {import('next').NextConfig} */
// const nextConfig = withAntdLess({
//     // lessVarsFilePath: './styles/variables.less',
//     reactStrictMode: true,
//     swcMinify: true,
//     assetPrefix: '',
//
// });
//
// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    assetPrefix: '',
    experimental: { esmExternals: true },
    transpilePackages: [ 'antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-notification', 'rc-tooltip' ],
    webpack: (config) => {
        config.infrastructureLogging = { debug: /PackFileCache/ }
        config.resolve.alias.canvas = false;
        config.cache = false;
        config.module.rules.push({
            test: /\.node$/,
            use: 'raw-loader',
        });

        return config;
    },
};

export default nextConfig;


// export default nextConfig;
// const nextConfig = {
//     reactStrictMode: true,
//     swcMinify: true,
//     assetPrefix: '',
// };
//
// export default nextConfig;
