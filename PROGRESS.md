# 项目状态快照

## 当前结论
- 2026-10-16：frontend 的唯一通用 Markdown renderer `src/components/Markdown.vue` 已接入 `markdown-it-cjk-friendly 3.0.0`，保持源 Markdown 原样，修复中文/日文/韩文无空格文本在标点边界上的 strong/emphasis/strikethrough 误配。
- 当前实际 `markdown-it 14.1.1` 已对 CommonMark 0.31.2 全部 652 个标准案例做原版 vs CJK-friendly 双跑，输出差异为 0；真实“**利尿药（diuretics）**和**子宫平滑肌兴奋药（uterine stimulants）**”故障可由插件正确修复。
- 回归从 7 个扩展到 10 个并全部通过；lint 与 Electron/Vite 完整 production build 也通过。构建仍有既有 Live2D script 与大 chunk warning，但与本次 Markdown 修改无关。

## 当前状态
- CJK-friendly Markdown 修复已完成并留有自动回归测试。
- 未触碰 `vendor/openclaw` 等第三方源码，也未修改聊天消息数据格式。

## 下一步
- 本项无需继续；后续若更换 Markdown renderer，应保留同等 CJK delimiter 回归测试。
