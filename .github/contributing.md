# RichX Contributing Guide

## Tool

- vite
- Typescript/tsx
- Typescript references
- lerna
- yarn workspace

## Project Introduction

For multi-package projects managed by lerna

- packages: plugins and Core
- examples: examples for usage
- templates: plugin templates
- scripts: scripts for dev and build

## Develop

### Install dependencies

```bash
git clone https://github.com/openHacking/richx.git
cd richx
npm i
npm i -g lerna
lerna bootstrap
npm run dev # or yarn dev
```

## Reference

- [Fluent UI Theme Slots](https://developer.microsoft.com/zh-CN/fluentui#/styles/web/colors/theme-slots)
