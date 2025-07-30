import * as React from 'react';
import { useState, useEffect } from 'react';

interface CodeBlockProps {
  src: string;
  type?: string;
}

interface CodeContent {
  content: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ src, type }) => {
  const [codeContent, setCodeContent] = useState<CodeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileContent = async () => {
      if (!src) {
        setError('未提供文件路径');
        setLoading(false);
        return;
      }

      try {
        // 获取文件扩展名作为默认语言
        const fileExtension = src.split('.').pop()?.toLowerCase() || '';
        const language = type || getLanguageFromExtension(fileExtension);

        // 在Rspress环境中，使用相对路径获取文件内容
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`无法加载文件: ${response.statusText}`);
        }

        const content = await response.text();
        setCodeContent({ content, language });
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载文件失败');
      } finally {
        setLoading(false);
      }
    };

    fetchFileContent();
  }, [src, type]);

  const getLanguageFromExtension = (ext: string): string => {
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
  };

  const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  if (loading) {
    return (
      <div className="code-block-loading">
        <div className="loading-spinner">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="code-block-error">
        <div className="error-message">错误: {error}</div>
      </div>
    );
  }

  if (!codeContent) {
    return null;
  }

  return (
    <div className="code-block-container">
      <pre className={`language-${codeContent.language}`}>
        <code className={`language-${codeContent.language}`}>
          {codeContent.content}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;