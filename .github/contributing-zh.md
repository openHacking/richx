# RichX 贡献指南

## 工具

- vite
- Typescript/tsx
- Typescript references
- lerna
- yarn workspace

## 工程介绍

lerna 管理的多包项目，

- packages 插件和核心
- examples 案例
- templates 插件模板
- scripts 脚本

## 开发

### 安装依赖

```bash
git clone https://github.com/openHacking/richx.git
cd richx
npm i
npm i -g lerna
lerna bootstrap
npm run dev # 或者yarn dev
```

## 参考

- [Fluent UI Theme Slots](https://developer.microsoft.com/zh-CN/fluentui#/styles/web/colors/theme-slots)
