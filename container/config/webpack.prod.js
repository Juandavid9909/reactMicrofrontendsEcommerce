const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        publicPath: "/"
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                auth: `auth@http://localhost:8082/remoteEntry.js`,
                marketing: `marketing@http://localhost:8081/remoteEntry.js`,
                dashboard: `dashboard@http://localhost:8083/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]
};

module.exports = merge(commonConfig, prodConfig);