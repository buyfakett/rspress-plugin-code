# rspress-plugin-code-block

一个Rspress插件，用于导入文件内容并以代码块形式渲染。

## 安装

```bash
npm install rspress-plugin-code-block
```

## 使用

### 1. 在rspress.config.ts中注册插件

```typescript
import { defineConfig } from '@rspress/core';
import { codeBlockPlugin } from 'rspress-plugin-code-block';

export default defineConfig({
  plugins: [
    codeBlockPlugin()
  ],
});
```

### 2. 在MDX中使用

安装插件后，您可以在MDX文件中直接使用CodeBlock组件：

```mdx
import { CodeBlock } from 'rspress-plugin-code-block';

# 我的文档

这是一个JavaScript文件的示例：

<CodeBlock src="./example.js" />

这是一个TypeScript文件，但指定为javascript语法高亮：

<CodeBlock src="./example.ts" type="javascript" />
```

### 3. Props

| 属性 | 类型 | 描述 |
|------|------|------|
| src | string | 要显示的文件路径（必需） |
| type | string | 语言类型，用于语法高亮（可选，默认根据文件扩展名自动识别） |

### 4. 支持的文件类型

插件支持以下文件扩展名的自动识别：

- JavaScript: `.js`, `.jsx`
- TypeScript: `.ts`, `.tsx`
- Python: `.py`
- Java: `.java`
- C/C++: `.c`, `.cpp`
- C#: `.cs`
- PHP: `.php`
- Ruby: `.rb`
- Go: `.go`
- Rust: `.rs`
- Swift: `.swift`
- HTML: `.html`
- CSS: `.css`, `.scss`, `.sass`, `.less`
- JSON: `.json`
- XML: `.xml`
- YAML: `.yaml`, `.yml`
- Markdown: `.md`
- Shell: `.sh`
- SQL: `.sql`
- Dockerfile: `.dockerfile`
- Vue: `.vue`
- Svelte: `.svelte`

## 示例

### 项目结构
```
my-docs/
├── docs/
│   ├── guide/
│   │   └── getting-started.md
│   └── examples/
│       ├── example.js
│       └── utils.ts
├── rspress.config.ts
└── package.json
```

### 在getting-started.md中使用
```markdown
# 快速开始

## 示例代码

下面是我们的JavaScript示例：

<code src="../examples/example.js" />

## 工具函数

这是一个TypeScript工具函数：

<code src="../examples/utils.ts" />
```

## 开发

### 本地开发

1. 克隆仓库
2. 安装依赖：`npm install`
3. 在测试项目中使用相对路径引入插件

### 构建

这是一个TypeScript项目，无需额外构建步骤。

## 许可证

MIT License