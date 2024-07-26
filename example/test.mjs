import { rollup } from "rollup";
import preserveDirectives from "@deer404/rollup-preserve-directives";

async function build() {
  const bundle = await rollup({
    input: "src/index.ts",
    plugins: [preserveDirectives()],
  });

  await bundle.write({
    file: "dist/bundle.js",
    format: "esm",
  });
}

build();
