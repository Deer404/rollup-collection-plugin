import MagicString from "magic-string";

export function preserveDirectives() {
  const directivesMap = new Map();

  return {
    name: "preserve-directives",
    transform(code, id) {
      console.log("Processing file:", id);
      console.log("File content:", code.slice(0, 20));
      const lines = code.split("\n");
      let directiveLines = [];

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (
          trimmedLine.startsWith('"use ') ||
          trimmedLine.startsWith("'use ")
        ) {
          directiveLines.push(line);
        } else if (trimmedLine !== "") {
          break;
        }
      }

      if (directiveLines.length > 0) {
        directivesMap.set(id, directiveLines.join("\n") + "\n\n");
      }

      return null; // 不修改代码，让其他插件正常处理
    },
    renderChunk(code, chunk) {
      const magicString = new MagicString(code);
      const directives = directivesMap.get(chunk.facadeModuleId);

      if (directives) {
        magicString.prepend(directives);
        return {
          code: magicString.toString(),
          map: magicString.generateMap({ hires: true }),
        };
      }

      return null;
    },
  };
}
export default preserveDirectives;
