# NagaAgent CJK-friendly Markdown ExecPlan

## 目标
- 让现有 `src/components/Markdown.vue` 的 markdown-it renderer 正确解析中日韩无空格文本中的 strong/emphasis/strikethrough 边界。
- 不修改 Markdown 源文，不用插空格/正则预处理；复用已在 ClassFlow 验证过的 `markdown-it-cjk-friendly`。

## 门禁
- 先按现有 lockfile 恢复依赖并记录 test/lint/build 基线。
- 使用 NagaAgent 实际 markdown-it 版本，对 CommonMark 0.31.2 标准案例双跑，要求原版与 CJK-friendly 非 CJK 结果无意外漂移。
- 增加真实中文括号/句号案例及普通英文嵌套 emphasis 回归。
- 改动后项目 test/lint/build 必须达到与基线相同或更好状态。

## 边界
- 只改 frontend 自己的 Markdown renderer，不修改 vendor/openclaw 或其他第三方源码。
- 若现有依赖恢复失败或项目自身基线异常，先记录并停止扩大改动。
