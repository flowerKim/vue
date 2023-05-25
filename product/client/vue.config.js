const { defineConfig } = require("@vue/cli-service");
// const target = "http://192.168.45.19:3000";
// const target = "http://127.0.0.1:3000";
const target = "http://192.168.50.77:3000";

module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      "^/api": {
        target,
        changeOrigin: true,
      },
      "^/upload": {
        target,
        changeOrigin: true,
      },
      "^/download": {
        target,
        changeOrigin: true,
      },
    },
  },
};

module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete("prefetch"); //prefetch 기능 삭제
  },
};
