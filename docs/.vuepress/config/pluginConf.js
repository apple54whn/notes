module.exports = [
  '@vuepress/nprogress',
  [
    'vuepress-plugin-container', // 插件名以 vuepress-plugin- 开头可省略
    {
      type: 'right',
      defaultTitle: '',
    },
  ],
  [
    'vuepress-plugin-container',
    {
      type: 'theorem',
      before: info => `<div class="theorem"><p class="title">${info}</p>`,
      after: '</div>',
    },
  ],

  // 这是 VuePress 默认主题使用这个插件的方式
  [
    'vuepress-plugin-container',
    {
      type: 'tip',
      defaultTitle: {
        '/': 'TIP',
        '/zh/': '提示',
      },
    },
  ],

  // [
  //   'copyright',
  //   {
  //     // noSelect: true,
  //     // noCopy: true, // 选中的文字将无法被复制
  //     // minLength: 100, // 如果长度超过 100 个字符
  //     // clipboardComponent: clipboardComponent, // 自定义剪贴板组件的路径，不会写，很尴尬
  //     authorName: {
  //       "en-US": "Conanan",
  //       "zh-CN": "Conanan"
  //     }
  //   },
  // ],
  ['vuepress-plugin-smooth-scroll'],
  ['@vuepress/back-to-top'],
  [
    'vuepress-plugin-zooming',
    {
      selector: '.theme-default-content img',
      delay: 10,
      options: {
        bgColor: 'black',
        zIndex: 10000,
      },
    },
  ],
  [
    '@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }
  ]

]