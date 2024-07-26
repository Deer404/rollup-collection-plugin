import typescript from "@rollup/plugin-typescript";
import { multiEntry } from "@deer404/rollup-preserve-directives";
import { preserveDirectives } from "@deer404/rollup-preserve-directives";
export default {
  output: [
    {
      dir: "dist/es",
      format: "es",
      preserveDirectives: true,
    },
    {
      dir: "dist/cjs",
      format: "cjs",
      preserveDirectives: true,
    },
  ],
  plugins: [multiEntry({ src: "src" }), preserveDirectives(), , typescript()],
};
