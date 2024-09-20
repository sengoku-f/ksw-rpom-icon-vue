
import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import del from 'rollup-plugin-delete'
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import path from "path";
import { fileURLToPath } from "url";
import { globSync } from "glob";

// 获取当前模块文件的 URL (ES模块)
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块目录的路径
const __dirname = path.dirname(__filename);

// 获取/icons文件夹下的所有图标名称
function getIconExternals() {
  const iconFiles = globSync(path.resolve(__dirname, "src/icons/*.js"));
  return iconFiles.map(
    (file) => `./icons/${path.basename(file, path.extname(file))}`
  );
}

// 获取多入口文件输入
function getFileInput() {
  const files = globSync([
    "src/index.js",
    "src/map.js",
    "src/runtime/*.js",
    "src/icons/*.js",
  ]);
  return Object.fromEntries(
    files.map((file) => [
      path.relative(
        // 相对于 `src` 文件夹生成相对路径
        "src",
        file.slice(0, file.length - path.extname(file).length)
      ),
      file,
    ])
  );
}

// 默认参数
const baseOutputConfig = {
  // compact: true,
  // entryFileNames: '[name].js',
  chunkFileNames: "[name].js",
  globals: {
    vue: "Vue",
  },
  // manualChunks: {
  //   gsap: ["gsap"],
  // },
};

export default [
  {
    input: getFileInput(),
    external: ["vue", "./map", "../runtime", ...getIconExternals()],
    plugins: [
      del({ targets: 'packages/*' }),
      nodeResolve(),
      babel({
        babelHelpers: "runtime",
        exclude: "node_modules/**",
      }),
      terser(),
    ],
    output: [
      {
        format: "es",
        dir: "packages/es",
        ...baseOutputConfig,
      },
      {
        format: "cjs",
        dir: "packages/cjs",
        ...baseOutputConfig,
      },
    ],
  },
  {
    input: getFileInput(),
    external: ["vue", "./map", "../runtime", ...getIconExternals()],
    plugins: [dts()],
    output: [
      {
        dir: "packages/es",
        format: "es",
      },
      {
        dir: "packages/cjs",
        format: "cjs",
      },
    ],
  },
];
