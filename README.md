# 句集 (Juji) - 句子分享网站

一个专注于分享精彩句子的平台，特别是中国古典诗词名句。

## 目录

- [项目概述](#项目概述)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [古诗词数据来源](#古诗词数据来源)
- [开发环境搭建](#开发环境搭建)
- [安装步骤](#安装步骤)
- [开发指南](#开发指南)
- [Git 工作流](#git-工作流)
- [部署](#部署)
- [许可证](#许可证)

## 项目概述

本项目是一个响应式网站，采用"移动端优先"(Mobile First)的设计策略，使用 Tailwind CSS 实现一套代码适配多端(PC + H5 Mobile)。

## 功能特性

- 响应式设计，适配移动端和桌面端
- 古诗词名句展示与分享
- 每日一句推荐功能
- 诗词名句搜索功能
- 按作者筛选诗词
- 点赞功能
- 现代化的UI设计

## 技术栈

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- React Server Components

## 项目结构

```
juzikong-web/
├── public/                       # 静态资源
│   ├── images/
│   │   ├── desktop-bg.jpg        # PC端高清大图
│   │   └── mobile-bg.jpg         # 移动端竖屏裁切图
│   └── manifest.json             # PWA 配置
│
├── src/
│   ├── app/                      # 路由层
│   │   ├── layout.tsx            # 全局布局
│   │   ├── page.tsx              # 首页
│   │   └── globals.css           # 全局样式
│   │
│   ├── components/               # 组件层
│   │   ├── common/               # 通用原子组件
│   │   │   └── Container.tsx     # 智能容器组件
│   │   │
│   │   ├── layout/               # 布局组件
│   │   │   ├── Header.tsx        # 自适应导航
│   │   │   └── BottomNav.tsx     # H5专属底部导航
│   │   │
│   │   └── features/             # 业务组件
│   │       ├── daily-quote/      # 每日一句模块
│   │       │   └── Hero.tsx      # 主容器组件
│   │       │
│   │       └── sentence-list/    # 列表模块
│   │           └── SentenceList.tsx # 句子列表组件
│   │
│   ├── data/                     # 数据层
│   │   └── poetry/               # 诗词数据处理
│   │       ├── poetryProcessor.ts # 诗词数据处理器
│   │       ├── poetryService.ts   # 诗词数据服务
│   │       ├── sampleTangPoetry.json # 唐诗样本数据
│   │       └── sampleSongCi.json     # 宋词样本数据
│   │
│   ├── hooks/                    # 逻辑层
│   │   ├── use-media-query.ts    # 媒体查询Hook
│   │   └── use-scroll-lock.ts    # 滚动锁定Hook
│   │
│   ├── lib/                      # 基础配置
│   │   └── utils.ts              # 工具函数
│   │
│   └── types/                    # 类型定义
│       └── index.ts              # TypeScript类型定义
│
├── tailwind.config.ts            # Tailwind 配置
├── next.config.js                # Next 配置
├── postcss.config.js             # PostCSS 配置
├── .gitignore                    # Git忽略文件配置
└── package.json                  # 项目依赖配置
```

## 古诗词数据来源

本项目集成了 [chinese-poetry](https://github.com/chinese-poetry/chinese-poetry) 项目中的古诗词数据作为基础句子资料库。该数据集包含：

- 5.5万首唐诗
- 2.2万首宋词
- 近1.4万首宋诗
- 以及其他古典文集

### 数据结构

诗词数据采用 JSON 格式存储，主要字段包括：

```json
{
  "title": "静夜思",
  "author": "李白",
  "paragraphs": [
    "床前明月光，疑是地上霜。",
    "举头望明月，低头思故乡。"
  ],
  "strains": [
    "仄平平仄平，平仄仄仄平。",
    "仄平仄平仄，平平平仄平。"
  ]
}
```

宋词数据额外包含词牌名：

```json
{
  "author": "苏轼",
  "paragraphs": [
    "十年生死两茫茫，不思量，自难忘。"
  ],
  "rhythmic": "江城子",
  "title": "江城子·乙卯正月二十日夜记梦"
}
```

## 开发环境搭建

在开始开发之前，请确保您的系统满足以下要求：

### 系统要求

- Node.js >= 16.8 (推荐使用 LTS 版本)
- npm 或 yarn 包管理器
- Git (用于版本控制)

### 推荐开发工具

- VS Code (推荐安装以下插件)
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - Tailwind CSS IntelliSense
  - TypeScript Importer
- Chrome 或 Firefox 浏览器用于调试

## 安装步骤

1. 克隆项目代码：
   ```bash
   git clone https://github.com/hezhewangdao/juji.git
   cd juji
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用

## 开发指南

### 项目启动命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 运行代码检查
npm run lint
```

### 添加新功能

1. 在 `src/components/` 目录下创建新组件
2. 如需添加新页面，在 `src/app/` 目录下创建新路由文件
3. 如需添加新数据处理逻辑，在 `src/data/` 目录下扩展
4. 更新 `src/types/index.ts` 添加新的类型定义

### 代码规范

- 使用 TypeScript 编写所有代码
- 遵循函数式编程原则
- 组件尽量保持无状态
- 使用 Tailwind CSS 进行样式设计

### 目录约定

- 所有页面组件放在 `src/app/` 目录下
- 可复用组件放在 `src/components/` 目录下
- 数据处理逻辑放在 `src/data/` 目录下
- 自定义 Hook 放在 `src/hooks/` 目录下
- 工具函数放在 `src/lib/` 目录下
- 类型定义放在 `src/types/` 目录下

## Git 工作流

### 分支策略

我们采用 Git Flow 工作流：

- `main` 分支：生产环境代码
- `develop` 分支：开发环境代码
- `feature/*` 分支：新功能开发分支
- `hotfix/*` 分支：紧急修复分支

### 提交规范

提交信息遵循以下格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

常用的 type 类型：
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

### 推送代码

```bash
# 添加修改的文件
git add .

# 提交代码
git commit -m "feat: 添加新功能"

# 推送到远程仓库
git push origin develop
```

## 部署

可以部署到以下平台：

### Vercel (推荐)

1. 将项目推送到 GitHub/GitLab/Bitbucket
2. 登录 Vercel 并导入项目
3. 设置环境变量（如有需要）
4. 点击部署

### Netlify

1. 构建项目：`npm run build`
2. 将 `out` 目录部署到 Netlify

### 自定义服务器

1. 构建项目：`npm run build`
2. 启动服务器：`npm start`
3. 配置反向代理（如 nginx）

## 许可证

MIT
