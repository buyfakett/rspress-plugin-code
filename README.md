# rspress-plugin-code-block

一个Rspress插件，用于在构建时将文件内容嵌入到MDX文档中作为静态代码块。

## 安装

```bash
pnpm add rspress-plugin-code-block
npm install rspress-plugin-code-block
```

## 配置

在 `rspress.config.ts` 中添加插件：

```typescript
import { defineConfig } from 'rspress/config';
import { codeBlockPlugin } from 'rspress-plugin-code-block';

export default defineConfig({
  plugins: [codeBlockPlugin()],
});
```

## 使用方法

### 使用 CodeBlock 组件

在MDX文件中导入并使用 CodeBlock 组件：

```markdown
import { CodeBlock } from 'rspress-plugin-code-block';

<CodeBlock src="config.json" />
```

### 指定语言类型

```markdown
import { CodeBlock } from 'rspress-plugin-code-block';

<CodeBlock src="utils.js" language="javascript" />
```

### 文件路径说明

- **相对路径**：相对于当前MDX文件的位置
- **支持任意位置**：文件可以放在docs目录的任何位置，不需要public目录
- **自动语言识别**：根据文件扩展名自动识别语言类型
- **纯静态嵌入**：在构建时读取文件内容，生成静态HTML

## 支持的文件格式

自动识别以下文件扩展名的语言类型：
- JavaScript: `.js`, `.jsx`
- TypeScript: `.ts`, `.tsx`
- Python: `.py`
- XML: `.xml`
- JSON: `.json`
- HTML: `.html`
- CSS: `.css`
- Shell: `.sh`
- 以及更多...

## 特点

- **编译时处理**：在构建阶段读取文件内容，生成静态代码块
- **无需运行时加载**：不依赖fetch或网络请求
- **支持相对路径**：文件可以放在与MDX文件相同或子目录中
- **自动语法高亮**：根据文件类型自动选择语言高亮方案
- **错误处理**：文件不存在时显示友好的错误信息

## 开发

### 本地开发

1. 克隆仓库
2. 安装依赖：`npm install`
3. 在测试项目中使用相对路径引入插件

### 构建

这是一个TypeScript项目，无需额外构建步骤。

## 许可证

MIT License