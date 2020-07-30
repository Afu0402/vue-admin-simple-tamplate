
module.exports = {
    publicPath: process.env.BASE_URL ? process.env.BASE_URL : '/',
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        proxy: {
            '/': {    // search为转发路径
                target: 'http://hygl.fzyjszx.com',  // 目标地址
                changeOrigin: true   // 设置同源  默认false，是否需要改变原始主机头为目标URL,               
            }
        }

    },
    lintOnSave: false,
}