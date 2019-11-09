// 处理你的 VuePress 站点中的复制操作。
// npm install vuepress-plugin-copyright


module.exports = [
  'copyright',
  {
    // noSelect: true,
    // noCopy: true, // 选中的文字将无法被复制
    // minLength: 100, // 如果长度超过 100 个字符
    // clipboardComponent: clipboardComponent, // 自定义剪贴板组件的路径，不会写，很尴尬
    authorName: {
        "en-US": "Conanan",
        "zh-CN": "Conanan"
    }
  },
]