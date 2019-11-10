const navConf = require('./config/navConf');// 可不加.js 后缀
const sidebarConf = require('./config/sidebarConf');
const markdownConf = require('./config/markdownConf');

// plugins
const pluginConf = require('./config/pluginConf');



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

  plugins: pluginConf
}
