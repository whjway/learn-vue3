const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
const AutoImport = require("unplugin-auto-import/webpack");
const VueMacros = require("unplugin-vue-define-options/webpack");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const CDN_ADDRESS = {
  staging: "http://static-test.51credit.com/h5-collections/",
  production: "http://static.51credit.com/h5-collections/"
};
const IS_PRODUCTION = process.env.NODE_ENV === "production"; // 本地开发&打包线上
const IS_BUILD_PRODUCTION = process.env.ENV === "production"; // 测试环境&线上环境

function resolve(dir) {
  return path.join(__dirname, dir);
}

console.log("process.env.ENV:", process.env.ENV);
console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
console.log("process.env.VUE_APP_BASE_API:", process.env.VUE_APP_BASE_API);

module.exports = defineConfig({
  // transpileDependencies: true, // 转义第三方依赖
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  outputDir: IS_PRODUCTION ? `dist/static/` : "dist",
  publicPath: IS_PRODUCTION
    ? IS_BUILD_PRODUCTION
      ? CDN_ADDRESS.production
      : CDN_ADDRESS.staging
    : "/",
  indexPath: IS_PRODUCTION ? "../index.html" : "index.html", // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  lintOnSave: !IS_PRODUCTION,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        // 简化每个组件频繁引用 sass-loader 版本10+
        additionalData: `
        @import "~@/assets/scss/variable.scss";
        @import "~@/assets/scss/mixin.scss";
        `
      }
    },
    extract: IS_PRODUCTION ? { ignoreOrder: true } : false
  },
  configureWebpack: (config) => {
    if (!IS_PRODUCTION)
      config.watchOptions = {
        // 开发时，自动保存代码导致构建频繁且会报错，又不想手动保存，则可以开启聚合构建
        aggregateTimeout: 1000,
        ignored: /node_modules/
      };

    config.plugins.push(
      new SpeedMeasurePlugin({
        // outputFormat: "humanVerbose",
        // loaderTopFiles: 10
      }),
      VueMacros(), // vue setup拓展
      ComponentsPlugin({
        // 组件按需加载
        resolvers: [VantResolver()]
      }),
      AutoImport({
        // setup api自动导入
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/ // .vue
        ],
        imports: [
          // pinia store
          //import { useRootStore } from "@/store/index";
          {
            "@/store/index": ["useRootStore"],
            "@/store/user": ["useUserStore"],
            "@/store/config": ["useConfigStore"]
          },
          "vue",
          "vue-router"
        ],
        eslintrc: {
          enabled: false, // 若没此json文件，先开启，生成后在关闭
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true
        },
        // resolvers: [],
        dts: "./auto-imports.d.ts"
      })
    );
    if (IS_PRODUCTION) {
      // terser-webpack-plugin (https://webpack.docschina.org/plugins/terser-webpack-plugin/);
      const TerserPluginIndex = config.optimization.minimizer.findIndex(
        (n) => n.__pluginName === "terser"
      );
      config.optimization.minimizer[TerserPluginIndex] = new TerserPlugin({
        terserOptions: {
          warnings: false,
          format: {
            comments: false
          },
          compress: {
            drop_debugger: true, // 注释console
            drop_console: true,
            pure_funcs: ["console.log"] // 移除console
          }
        },
        extractComments: false, // 是否将注释提取到一个单独的文件中
        parallel: true // 是否并⾏打包
      });
    }
  },
  chainWebpack(config) {
    // 移除 preload 插件
    config.plugins.delete("preload");
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 优化二次启动速度
    config.cache({
      // 将缓存类型设置为文件系统,默认是memory
      type: "filesystem",
      buildDependencies: {
        // 更改配置文件时，重新缓存
        config: [__filename]
      }
    });

    config.plugin("html").tap((args) => {
      args[0].title = "看数藏";
      return args;
    });

    config.when(IS_PRODUCTION, (config) => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          vantUI: {
            name: "chunk-vant", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },
  devServer: {
    allowedHosts: "all",
    port: 80, //1 微信授权重定向不支持带端口的访问域名 2 配置80端口，就可以只输入网址 3 sudo 启动项目
    // open: true,
    client: {
      progress: true,
      overlay: {
        warnings: false,
        errors: true
      }
    },
    proxy: {
      "/nft/*": {
        // target: 'https://h5.51chacredit.com/test0api.51chacredit.com', //不能使用 就是登录和访问接口的ua和ip要一致
        target: "http://192.168.5.76:8898",
        changeOrigin: true
      }
    }
  }
});
