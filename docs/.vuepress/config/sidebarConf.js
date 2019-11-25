module.exports = {

  // 多个侧边栏，暂不使用，侧边栏分组也可以实现

  // 侧边栏分组，只显示一组内容
  '/Basic/OS/Linux/': [
    {
      title: 'Linux',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Intro',
        '1 Intro1',

      ]
    }
  ],

  '/Basic/Network/': [
    {
      title: 'Network',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Intro',
      ]
    },
    {
      title: 'HTTP',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Intro',
      ]
    }
  ],

  '/Basic/DataBase/': [
    {
      title: 'MySQL',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Intro',
      ]
    },
    {
      title: 'Redis',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Intro',
      ]
    },
    {
      title: 'Mongo',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Intro',
      ]
    }
  ],


  '/Java/Core/': [
    {
      title: 'Core',
      collapsable: true, // 控制 组 的 close
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
        '16 9,10,11新特性',
        '17 Test',
        '18 设计原则&设计模式',
      ]
    },
    {
      title: 'Code',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [

      ]
    },



  ],



  // ---------------------Devops start---------------------------

  '/Devops/Vim/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        'Vim',
      ]
    }
  ],
  '/Devops/Git/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        'Git',
      ]
    }
  ],
  '/Devops/Maven/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        'Maven',
      ]
    }
  ],

  '/Devops/Docker/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        'Docker',
      ]
    }
  ],
  '/Devops/K8/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        'K8',
      ]
    }
  ],

  // ---------------------Devops end---------------------------


  
}