// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // "postcss-import": {
    //   // postcss-import兼容~@方式引入css
    //   resolve(url) {
    //     if (url.charAt(0) == '~') {
    //       return url.replace(/^~[^\/]*\//, '')
    //     } else {
    //       return url
    //     }
    //   }
    // },
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
