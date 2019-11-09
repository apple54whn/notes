const navConf = require('./config/navConf');// 可不加.js 后缀
const sidebarConf = require('./config/sidebarConf');
const markdownConf = require('./config/markdownConf');

// plugins
const containerPluginConf = require('./config/pluginConf/containerPluginConf');
const copyrightPluginConf = require('./config/pluginConf/copyrightPluginConf');
const mediumZoomPluginConf = require('./config/pluginConf/mediumZoomPluginConf');


module.exports = {
  title: 'Conanan\'s Notes',
  description: 'Good Good Study, Day Day Up!',
  themeConfig: {
    // 导航栏 logo
    // logo: './logo.png',

    // 导航栏链接
    nav: navConf,
    
    // 侧边栏打开显示所有页面的标题链接（同一目录下）
    displayAllHeaders: false, // 默认值：false
    
    // 自动生成侧边栏，仅包含了当前页面标题（headers）链接的侧边栏
    // sidebar: 'auto'

    sidebar: sidebarConf,

    lastUpdated: "上次更新时间"
  },

  markdown: markdownConf,

  plugins: [
    [
      'vuepress-plugin-zooming',
      {
        selector: 'img',
        delay: 10,
        options: {
          bgColor: 'black',
          zIndex: 10000,
        },
      },
    ],
    '@vuepress/back-to-top',
    '@vuepress/nprogress',
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
    ], 

    copyrightPluginConf,
    
  ]
}
