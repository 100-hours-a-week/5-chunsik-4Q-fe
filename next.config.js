// Import the necessary plugin
const withAntdLess = require('next-plugin-antd-less');

/** @type {import('next').NextConfig} */
module.exports = withAntdLess({
    lessVarsFilePath: './styles/variables.less', // Path to your LESS variables file (optional)
    reactStrictMode: true, // Strict mode for React
    swcMinify: true, // Enables SWC for minification

    // Custom Webpack configuration
});
