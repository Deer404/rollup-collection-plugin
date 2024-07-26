export default async function config() {
  return {
    input: "src/index.js",
    output: [
      { file: "dist/index.cjs.js", format: "cjs" },
      { file: "dist/index.esm.js", format: "es" },
    ],
    external: ["magic-string"],
    plugins: [],
  };
}
