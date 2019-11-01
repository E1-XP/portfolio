const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cleanCSS = require("clean-css");

import env from "dotenv";
env.config();

export default {
  mode: "universal",
  env: {
    GITHUB_KEY: process.env.GITHUB_KEY,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Personal portfolio of Sebastian Stypula - aspiring JavaScript Developer"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com/",
        crossorigin: "true"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/scss/main.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/dotenv",
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources"
  ],
  styleResources: {
    scss: ["./assets/scss/utils/*.scss"]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    postcss: {
      plugins: {
        "postcss-import": {},
        "postcss-url": {},
        "postcss-preset-env": this.preset,
        cssnano: false,
        "postcss-clean": {
          level: 2
        }
      },
      order: "presetEnvAndCssnanoLast",
      preset: {
        stage: 2
      }
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserJSPlugin(),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: cleanCSS
        })
      ],
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: ".",
        name: undefined,
        cacheGroups: {}
      }
    }
  }
};
