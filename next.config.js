import withAntdLess from 'next-plugin-antd-less';

/** @type {import('next').NextConfig} */
const nextConfig = withAntdLess({
    lessVarsFilePath: './styles/variables.less',
    reactStrictMode: true,
    swcMinify: true,

    // Custom Webpack configuration
});

export default nextConfig;
