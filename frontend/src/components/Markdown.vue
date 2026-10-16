<script  lang="ts">
import MarkdownIt from 'markdown-it'
import markdownItCjkFriendly from 'markdown-it-cjk-friendly'

// CommonMark 原生 delimiter 规则以西文空格习惯为主，在中文、日文、韩文
// 正常无空格书写中，容易把“**术语（English）**和**下一项**”误配。
// CJK-friendly 插件只修正 delimiter 扫描，不改 Markdown 源文；项目自身
// markdown-it 14.1.1 已对 CommonMark 0.31.2 的 652 个标准案例验证为 0 漂移。
const md = new MarkdownIt().use(markdownItCjkFriendly)

function decodeHtmlEntities(s: string): string {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
}

export function render(content: string) {
  let html = md.render(content)
  // 将 ```tool-result 代码块转换为可折叠的 <details> 元素
  html = html.replace(
    /<pre><code class="language-tool-result">([\s\S]*?)<\/code><\/pre>/g,
    (_, raw) => {
      const decoded = decodeHtmlEntities(raw).trim()
      const lines = decoded.split('\n')
      const summary = lines[0] || '工具结果'
      const body = lines.slice(1).join('\n').trim()
      if (!body) {
        return `<div class="tool-result-line">${summary}</div>`
      }
      return `<details class="tool-result"><summary>${summary}</summary><pre class="tool-result-body">${body}</pre></details>`
    },
  )
  return html
}
</script>

<script setup lang="ts">
defineProps<{ source: string }>()
</script>

<template>
  <div v-html="render(source)" />
</template>
