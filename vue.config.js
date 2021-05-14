// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? process.env.VUE_APP_PUBLIC_PATH
        : '/lc/',
    transpileDependencies: ['vuex-module-decorators'],
}
