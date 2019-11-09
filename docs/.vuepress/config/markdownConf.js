module.exports = {
  // markdown-it-anchor 的选项，滚动页面是侧边栏激活
  anchor: { permalink: true },
  // markdown-it-toc 的选项
  toc: { 
    includeLevel: [1, 2, 3] // 展示的标题级别
  },
  extendMarkdown: md => {
    // 使用更多的 markdown-it 插件!
    // md.use(require('markdown-it-xxx'))
  }
}