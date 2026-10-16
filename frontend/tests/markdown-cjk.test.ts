import assert from 'node:assert/strict'
import test from 'node:test'
import MarkdownIt from 'markdown-it'
import markdownItCjkFriendly from 'markdown-it-cjk-friendly'

const md = new MarkdownIt().use(markdownItCjkFriendly)

test('CJK 标点后的 strong 应按自然中文边界闭合', () => {
  const html = md.renderInline(
    '**利尿药（diuretics）**和**子宫平滑肌兴奋药（uterine stimulants）**展开。',
  )

  assert.equal(
    html,
    '<strong>利尿药（diuretics）</strong>和<strong>子宫平滑肌兴奋药（uterine stimulants）</strong>展开。',
  )
})

test('CJK 修正规则不能破坏普通英文嵌套 emphasis、链接和代码', () => {
  const source = 'ordinary **English bold**；**bold *nested italic* bold**；[**link**](https://example.com)；`**code**`'
  const html = md.renderInline(source)

  assert.match(html, /<strong>English bold<\/strong>/)
  assert.match(html, /<strong>bold <em>nested italic<\/em> bold<\/strong>/)
  assert.match(html, /<a href="https:\/\/example\.com"><strong>link<\/strong><\/a>/)
  assert.match(html, /<code>\*\*code\*\*<\/code>/)
})

test('CJK 句号与删除线应在紧邻后文时正常闭合', () => {
  assert.equal(
    md.renderInline('这是**非常重要的一句话。**然后继续。'),
    '这是<strong>非常重要的一句话。</strong>然后继续。',
  )
  assert.equal(
    md.renderInline('这是~~删除内容。~~然后继续。'),
    '这是<s>删除内容。</s>然后继续。',
  )
})
