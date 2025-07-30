/// <reference types="node" />

import type { RspressPlugin } from '@rspress/core';
import * as path from 'path';

declare const __dirname: string;

export function codeBlockPlugin(): RspressPlugin {
  const componentPath = path.join(__dirname, 'CodeBlock.js');
  
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