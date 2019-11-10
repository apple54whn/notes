const navConf = require('./config/navConf');// 可不加.js 后缀
const sidebarConf = require('./config/sidebarConf');
const markdownConf = require('./config/markdownConf');

// plugins
const pluginConf = require('./config/pluginConf');



module.exports = {
  title: 'Conanan\'s Notes',
  description: 'Good Good Study, Day Day Up!',
  themeConfig: {
    base:'/notes-vuepress/',
    smoothScroll: true,
    
    // logo: './logo.png', // 导航栏 logo

    displayAllHeaders: false, // 默认值：false，侧边栏打开显示所有页面的标题链接（同一目录下）
    // sidebar: 'auto' // 自动生成侧边栏，仅包含了当前页面标题（headers）链接的侧边栏
    
    nav: navConf,
    sidebar: sidebarConf,
    
    
    
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'apple54whn/notes-vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // repoLabel: '查看源码',
    
    // 以下为可选的编辑链接选项
    
    // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    // docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '编辑文档！',
    lastUpdated: "上次更新时间",
    
  },

  markdown: markdownConf,

  plugins: pluginConf
}
