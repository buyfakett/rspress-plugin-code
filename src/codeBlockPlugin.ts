import type { RspressPlugin } from '@rspress/core';
import * as fs from 'fs';
import * as path from 'path';

interface CodeNode {
  type: string;
  lang?: string;
  meta?: string;
  value: string;
}

interface FileInfo {
  path: string;
}

export function codeBlockPlugin(): RspressPlugin {
  return {
    name: 'rspress-plugin-code-block',
    markdown: {
      remarkPlugins: [
        () => (tree: any, file: FileInfo) => {
          const { visit } = require('unist-util-visit');
          
          visit(tree, 'code', (node: CodeNode) => {
            // 检查是否有src属性
            const srcMatch = node.meta?.match(/src="([^"]+)"/);
            if (srcMatch) {
              const srcPath = srcMatch[1];
              const currentDir = path.dirname(file.path);
              const fullPath = path.resolve(currentDir, srcPath);
              
              try {
                const content = fs.readFileSync(fullPath, 'utf-8');
                
                // 更新节点内容
                node.value = content;
                
                // 处理type属性
                const typeMatch = node.meta?.match(/type="([^"]+)"/);
                if (typeMatch) {
                  node.lang = typeMatch[1];
                } else {
                  // 根据文件扩展名自动识别语言
                  const ext = path.extname(fullPath).slice(1);
                  node.lang = getLanguageFromExtension(ext);
                }
              } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                node.value = `<!-- 文件读取失败: ${srcPath} - ${errorMessage} -->`;
              }
            }
          });
        }
      ]
    }
  };
}

function getLanguageFromExtension(ext: string): string {
  const extensionMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'php': 'php',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'swift': 'swift',
    'kt': 'kotlin',
    'scala': 'scala',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'md': 'markdown',
    'sh': 'bash',
    'sql': 'sql',
    'dockerfile': 'dockerfile',
    'vue': 'vue',
    'svelte': 'svelte',
  };
  return extensionMap[ext] || ext;
}