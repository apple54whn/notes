const navConf = require('./config/navConf');// 可不加.js 后缀
const sidebarConf = require('./config/sidebarConf');
const markdownConf = require('./config/markdownConf');

// plugins
const pluginConf = require('./config/pluginConf');



module.exports = {
  title: 'Conanan\'s Notes',
  description: 'Good Good Study, Day Day Up!',
  themeConfig: {
    
    // logo: './logo.png', // 导航栏 logo

    displayAllHeaders: false, // 默认值：false，侧边栏打开显示所有页面的标题链接（同一目录下）
    // sidebar: 'auto' // 自动生成侧边栏，仅包含了当前页面标题（headers）链接的侧边栏
    lastUpdated: "上次更新时间",
    
    nav: navConf,
    sidebar: sidebarConf,


    

  },

  markdown: markdownConf,

  plugins: pluginConf
}
