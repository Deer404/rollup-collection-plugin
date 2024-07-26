
# Deer404 Rollup Collection Plugin

This package provides two custom Rollup plugins: `multiEntry` and `preserveDirectives`. These plugins enhance your Rollup build process by allowing multiple entry points and preserving directive comments.

## Installation

You can install this package using npm:

```bash
npm install --save-dev @deer404/rollup-collection-plugin
```

Or using yarn:

```bash
yarn add --dev @deer404/rollup-collection-plugin
```

```bash
# or
pnpm add --dev @deer404/rollup-collection-plugin
```

## Plugins

### 1. multiEntry

The `multiEntry` plugin allows you to specify multiple entry points for your Rollup build. It automatically finds all matching files in your source directory and sets them as entry points.

#### Usage

```javascript
import { multiEntry } from 'rollup-custom-plugins';

export default {
  // ... other rollup config
  plugins: [
    multiEntry({
      src: 'src',
      ignore: [
        '**/*.test.ts',
        '**/*.spec.ts',
        // ... other patterns to ignore
      ]
    }),
    // ... other plugins
  ],
};
```

#### Options

- `src` (string): The source directory to search for entry files. Default: `'src'`
- `ignore` (string[]): An array of glob patterns to ignore. Default: `['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx', '**/*.d.ts', '**/setupTests.ts', '**/reportWebVitals.ts']`

### 2. preserveDirectives

The `preserveDirectives` plugin preserves directive comments (like `'use strict'`) at the top of your files during the bundling process.

#### Usage

```javascript
import { preserveDirectives } from 'rollup-custom-plugins';

export default {
  // ... other rollup config
  plugins: [
    preserveDirectives(),
    // ... other plugins
  ],
};
```

This plugin doesn't accept any options.

## Example

Here's an example of how to use both plugins in your Rollup configuration:

```javascript
import { multiEntry, preserveDirectives } from 'rollup-custom-plugins';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: ".",
    entryFileNames: "[name].js",
  },
  plugins: [
    multiEntry({ src: "src" }),
    preserveDirectives(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  external: [/node_modules/],
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT License

Copyright (c) 2024 Deer404

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
