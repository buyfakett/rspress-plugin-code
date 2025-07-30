import type { RspressPlugin } from '@rspress/core';

export function codeBlockPlugin(): RspressPlugin {
  return {
    name: 'rspress-plugin-code-block',
    builderConfig: {
      source: {
        define: {
          'process.env.NODE_ENV': JSON.stringify(typeof process !== 'undefined' ? process.env.NODE_ENV || 'development' : 'development'),
        },
      },
    },
  };
}