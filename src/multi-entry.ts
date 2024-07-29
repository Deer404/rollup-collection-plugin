import { glob } from "glob";
import path from "path";

// Define an interface for the plugin options
interface MultiEntryOptions {
  src?: string;
  ignore?: string[];
  filePattern?: string;
}

export function multiEntry(options: MultiEntryOptions = {}) {
  // Destructure the options with default values
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
    // Add the new filePattern option with a default value
    filePattern = "**/*.{ts,tsx,js,jsx}",
  } = options;

  return {
    name: "multi-entry",
    options(inputOptions: any) {
      // Use the filePattern in the glob.sync call
      const allFiles = glob.sync(path.join(src, filePattern), { ignore });
      return { ...inputOptions, input: allFiles };
    },
  };
}
