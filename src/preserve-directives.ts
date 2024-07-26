import MagicString from "magic-string";

interface RenderedChunk {
  facadeModuleId: string | null;
  fileName: string;
  moduleIds: string[];
  isEntry: boolean;
}

export function preserveDirectives(options = { singleChunk: false }) {
  const directivesMap = new Map<string, string[]>();
  let hasAddedDirectives = false;

  return {
    name: "preserve-directives",
    transform(code: string, id: string) {
      const lines = code.split("\n");
      let directiveLines: string[] = [];

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (
          trimmedLine.startsWith('"use ') ||
          trimmedLine.startsWith("'use ")
        ) {
          directiveLines.push(trimmedLine);
        } else if (trimmedLine !== "") {
          break;
        }
      }

      if (directiveLines.length > 0) {
        directivesMap.set(id, directiveLines);
      }

      return null;
    },
    renderChunk(code: string, chunk: RenderedChunk) {
      // 如果是单一chunk模式且已经添加过指令，则跳过
      if (options.singleChunk && hasAddedDirectives) {
        return null;
      }

      const magicString = new MagicString(code);
      let directives: string[] = [];

      if (chunk.isEntry || options.singleChunk) {
        if (chunk.facadeModuleId) {
          directives = directivesMap.get(chunk.facadeModuleId) || [];
        }

        // 如果没有facadeModuleId或未找到指令，遍历所有模块ID
        if (directives.length === 0) {
          for (const moduleId of chunk.moduleIds) {
            const moduleDirectives = directivesMap.get(moduleId);
            if (moduleDirectives) {
              directives.push(...moduleDirectives);
            }
          }
        }

        // 去重
        directives = Array.from(new Set(directives));

        // 特殊处理 'use client'
        const useClientIndex = directives.findIndex((d) =>
          d.includes("use client")
        );
        if (useClientIndex !== -1) {
          const useClient = directives.splice(useClientIndex, 1)[0];
          directives.unshift(useClient);
        }

        if (directives.length > 0) {
          magicString.prepend(directives.join("\n") + "\n\n");
          hasAddedDirectives = true;
          return {
            code: magicString.toString(),
            map: magicString.generateMap({ hires: true }),
          };
        }
      }

      return null;
    },
  };
}
