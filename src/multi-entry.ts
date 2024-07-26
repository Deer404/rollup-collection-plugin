import { glob } from "glob";
import path from "path";

export function multiEntry(options: any = {}) {
  const {
    src = "src",
    ignore = [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "**/*.d.ts",
      "**/setupTests.ts",
      "**/reportWebVitals.ts",
    ],
  } = options;

  return {
    name: "multi-entry",
    options(inputOptions: any) {
      const allFiles = glob.sync(path.join(src, "**/*.{ts,tsx}"), { ignore });
      return { ...inputOptions, input: allFiles };
    },
  };
}
