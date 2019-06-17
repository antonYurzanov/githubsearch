module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '^/search': {
                    target: 'https://api.github.com/',
                    ws: true,
                    changeOrigin: true
                }
            }
        }
    }
};
