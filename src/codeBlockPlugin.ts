import type { RspressPlugin } from '@rspress/core';
import * as fs from 'fs';
import * as path from 'path';

interface JSXNode {
  type: string;
  name?: string;
  lang?: string;
  value?: string;
  meta?: string;
  attributes?: Array<{
    type: string;
    name: string;
    value: string;
  }>;
  children?: any[];
}

interface FileInfo {
  path: string;
}

// 使用Rspress提供的内置工具函数
export function codeBlockPlugin(): RspressPlugin {
  return {
    name: 'rspress-plugin-code-block',
    markdown: {
      remarkPlugins: [
        function() {
          // 使用Rspress内置的visit函数
          const visit = (tree: any, type: string, callback: (node: JSXNode) => void) => {
            if (tree.type === type) {
              callback(tree);
            }
            if (tree.children) {
              tree.children.forEach((child: any) => visit(child, type, callback));
            }
          };

          return (tree: any, file: FileInfo) => {
            visit(tree, 'mdxJsxFlowElement', (node: JSXNode) => {
              // 检查是否是CodeBlock组件
              if (node.name === 'CodeBlock') {
                const srcAttr = node.attributes?.find(attr => attr.name === 'src');
                const languageAttr = node.attributes?.find(attr => attr.name === 'language');
                
                if (srcAttr) {
                  const srcPath = srcAttr.value;
                  const currentDir = path.dirname(file.path);
                  const fullPath = path.resolve(currentDir, srcPath);
                  
                  try {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    
                    // 获取语言
                    let language = '';
                    if (languageAttr) {
                      language = languageAttr.value;
                    } else {
                      const ext = path.extname(fullPath).slice(1);
                      language = getLanguageFromExtension(ext);
                    }
                    
                    // 将CodeBlock组件替换为代码块
                    const newNode = {
                      type: 'code',
                      lang: language,
                      meta: null,
                      value: content
                    };
                    
                    // 替换节点
                    Object.assign(node, newNode);
                  } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    node.type = 'code';
                    node.lang = '';
                    node.value = `<!-- 文件读取失败: ${srcPath} - ${errorMessage} -->`;
                  }
                }
              }
            });
          };
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