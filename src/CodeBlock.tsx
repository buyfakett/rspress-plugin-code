import React from 'react';

interface CodeBlockProps {
  src: string;
  language?: string;
}

// 编译时处理，运行时直接渲染内容
const CodeBlock: React.FC<CodeBlockProps> = ({ src, language }) => {
  // 实际内容会在编译时通过remark插件替换
  return (
    <pre>
      <code className={language ? `language-${language}` : ''}>
        {/* 内容将在编译时被替换 */}
      </code>
    </pre>
  );
};

export default CodeBlock;