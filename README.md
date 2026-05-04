# 十二人格卡片测试网站

这是一个可以直接部署的 React + Vite 单页人格测试网站。

## 功能

- 30道高质量人格测试题
- 六维计分模型：A行动力、M洞察力、C共情力、S秩序力、X探索力、L叙事力
- 自动生成12种人格结果卡片
- 手机端与电脑端自适应
- 内置动漫风 SVG 人格头像，不依赖外部图片
- 支持分享结果

## 本地运行

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build
```

## 部署到 Vercel

1. 把整个文件夹上传到 GitHub。
2. 打开 Vercel，选择 New Project。
3. 导入 GitHub 仓库。
4. Framework Preset 选择 Vite。
5. Build Command 使用 `npm run build`。
6. Output Directory 使用 `dist`。
7. 点击 Deploy。

## 修改题目

题目在 `src/App.jsx` 的 `questions` 数组中。

每个选项通过 `add` 给六个维度加分，例如：

```js
{ text: "先分析任务背后的结构和风险", add: { M: 3, S: 1 } }
```

## 修改人格卡片

人格卡片在 `src/App.jsx` 的 `TYPE_CARDS` 对象中。

你可以修改：
- code
- name
- subtitle
- motto
- portrait
- strengths
- blindspots
- advice

## 替换动漫图

当前使用 SVG 自动生成头像。若要替换为 AI 图片，可以：
1. 把图片放到 `public/images/`。
2. 在结果卡片区域把 `<AnimeAvatar />` 替换成 `<img src="/images/你的图片.png" />`。
