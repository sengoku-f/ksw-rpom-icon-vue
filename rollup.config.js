const path = require("path");
const glob = require("glob");
const vue = require("rollup-plugin-vue");
const babel = require("@rollup/plugin-babel").default;
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve").default;
const { terser } = require("rollup-plugin-terser");
const replace = require("@rollup/plugin-replace");
const { emptyDir } = require("rollup-plugin-empty-dir");
// const typescript = require('@rollup/plugin-typescript');

// 获取入口文件
function getFileInput() {
  const files = glob.sync([
    "src/index.js",
    "src/map.js",
    "src/runtime/*.js",
    "src/icons/*.js",
  ]);
  return Object.fromEntries(
    files.map((file) => [
      path.relative(
        "src",
        file.slice(0, file.length - path.extname(file).length)
      ),
      file,
    ])
  );
}

// 获取/icons文件夹下的所有图标名称
function getIconExternals() {
  const iconFiles = glob.sync(path.resolve(__dirname, "src/icons/*.js"));
  return iconFiles.map(
    (file) => `./icons/${path.basename(file, path.extname(file))}`
  );
}

const plugins = [
  vue({
    css: true, // 将 CSS 提取到单独的文件中
    compileTemplate: true, // 将模板编译为 render 函数
  }),
  resolve(),
  commonjs(),
  babel({
    babelHelpers: "runtime",
    exclude: "node_modules/**",
  }),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true,
  }),
  terser(),
  emptyDir(),
];

module.exports = [
  {
    input: getFileInput(),
    external: ["vue", "./map", "../runtime", ...getIconExternals()],
    output: [
      {
        format: "es",
        dir: "packages/es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        globals: {
          vue: "Vue",
        },
        // plugins: [
        //   ...plugins,
        //   typescript({
        //     outDir: "packages/es",
        //   }),
        // ],
      },
      {
        format: "cjs",
        dir: "packages/cjs",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        globals: {
          vue: "Vue",
        },
        // plugins: [
        //   ...plugins,
        //   typescript({
        //     outDir: "packages/cjs",
        //   }),
        // ],
      },
    ],
    plugins,
  },
];
