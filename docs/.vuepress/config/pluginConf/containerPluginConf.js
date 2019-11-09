// 在你的 VuePress 站点中注册新的 Markdown 容器。
// 安装：npm install vuepress-plugin-container
// 你可以多次使用这个插件
module.exports = [
  [
    'vuepress-plugin-container',
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
  ]
]