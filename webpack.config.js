module.exports = {
    // ... other config options
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
                exclude: /node_modules/,
            },
            // ... other rules
        ],
    },
};