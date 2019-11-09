module.exports = {
  title: 'Conanan\'s Notes',
  description: 'Good Good Study, Day Day Up!',
  themeConfig: {
    // 导航栏 logo
    // logo: './logo.png',
    
    // 导航栏链接
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Java',
        ariaLabel: 'Java Study',
        items: [
          { text: 'Core', link: '/Java/Core/1 Basic Syntax' },
          { text: 'Framwork', link: '/Java/Framwork/1 Spring' }
        ]
      },
      {
        text: 'Languages2',
        items: [
          {
            text: 'Group1', items: [
              { text: 'Chinese', link: '/language/chinese/' },
              { text: 'Japanese', link: '/language/japanese/' }
            ]
          },
          {
            text: 'Group2', items: [
              { text: 'Chinese', link: '/language/chinese/' },
              { text: 'Japanese', link: '/language/japanese/' }
            ]
          }
        ]
      },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ],
    
    // 侧边栏打开显示所有页面的标题链接（同一目录下）
    displayAllHeaders: false, // 默认值：false
    
    // 仅包含了当前页面标题（headers）链接的侧边栏
    // sidebar: 'auto'

    // 多个侧边栏，暂不使用，侧边栏分组也可以实现

    // 侧边栏分组，只显示一组内容
    sidebar: {
      '/Java/Core/': [
        {
          title: 'Core',
          collapsable: false, // 控制 组 的 colse
          sidebarDepth: 2, 
          children: [
            '0 Basic',  
            '1 Basic Syntax',  
            '2 Object Orientation',
            '3 Error & Exception',
            '4 API',
            '5 Generic',
            '6 Container',
            '7 Thread',
            '7 Thread2',
            '8 IO',
            '9 NIO',
            '10 AIO',
            '11 Network',
            '12 Reflect',
            '13 Lambda',
            '14 Stream API',
            '15 Optional',
            '16 Test',
            '17 设计原则&设计模式',
          ]
        },
      ],

    }

    
  }
}
