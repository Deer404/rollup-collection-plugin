import typescript from "@rollup/plugin-typescript";
import preserveDirectives from "@deer404/rollup-preserve-directives";
export default async function config() {
  return {
    input: "src/index.ts",
    output: [
      // { file: "dist/index.cjs.js", format: "cjs" },
      { file: "dist/index.esm.js", format: "es" },
    ],
    plugins: [preserveDirectives(), typescript()],
  };
}
