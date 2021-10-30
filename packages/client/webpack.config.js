const path = require('path');

module.exports = function(_env, argv) {
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;

    return {
        devtool: isDevelopment && "cheap-module-source-map",
        entry: './src/Index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                },
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
            ],
        },
        resolve: {
            // Enable webpack find ts and tsx files without an extension
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.less'],
        },
        mode: isDevelopment ? 'development' : 'production',
        devServer: {
            static: 'dist'
        }
        };
}
