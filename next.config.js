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
    transpilePackages: ["antd", "@ant-design"], // Uncomment if needed
    // webpack(config, { dev, isServer }) {
    //     config.module.rules.push({
    //         test: /\.(ts|tsx)$/,
    //         exclude: /node_modules/,
    //         use: [
    //             {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: [
    //                         'next/babel',
    //                         '@babel/preset-typescript',
    //                         '@wyw-in-js/babel-preset' // Ensure this is correctly installed
    //                     ],
    //                 },
    //             },
    //             {
    //                 loader: '@wyw-in-js/webpack-loader', // Ensure this is correctly installed
    //                 options: {
    //                     sourceMap: dev,
    //                 },
    //             },
    //         ],
    //     });
    //
    //     return config;
    // },
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
