import type { RspressPlugin } from '@rspress/core';

export function codeBlockPlugin(): RspressPlugin {
  // 使用相对于插件根目录的路径
  const componentPath = './CodeBlock.js';
  
  return {
    name: 'rspress-plugin-code-block',
    globalUIComponents: [componentPath],
    builderConfig: {
      source: {
        define: {
          'process.env.NODE_ENV': JSON.stringify(typeof process !== 'undefined' ? process.env.NODE_ENV || 'development' : 'development'),
        },
      },
    },
  };
}