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
        '2 Intro2',


      ]
    }
  ],

  '/Basic/Network/': [
    {
      title: 'Network',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
      ]
    },
    {
      title: 'HTTP',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 1,
      children: [
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




  // ---------------------Core Java start-----------------------
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
  // ---------------------Core Java end-------------------------


  // -----------------Service Framwork start--------------------
  '/Java/Framwork/Service/Spring Boot/': [
    {
      title: 'Spring Boot',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Primer',
        '1 Conf',
        '2 DB',

      ]
    },
  ],
  // -----------------Service Framwork end----------------------


  // -----------------Persistence Framwork start--------------------
  '/Java/Framwork/Persistence/Mybatis/': [
    {
      title: 'Mybatis',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Primer',

      ]
    },
  ],
  '/Java/Framwork/Persistence/Mybatis Plus/': [
    {
      title: 'Mybatis Plus 3.3.0',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Primer',
        '1 Conf',
        '2 CRUD',
        '3 Wrapper',
        '4 Plugins',
        '5 ActiveRecord',



      ]
    },
  ],
  // -----------------Persistence Framwork end----------------------





  // ---------------------Design start---------------------------
  '/Design/Design Pattern/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Intro',
      ]
    }
  ],
  '/Design/MicroServer/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Intro',
      ]
    }
  ],
  // ---------------------Design end-----------------------------




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
        '0 Docker',
        '1 Docker Compose',
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
  // ---------------------Devops end-----------------------------


  // ---------------------Front End start---------------------------
  '/Front End/Web/': [
    {
      title: 'HTML',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '1 HTML',
      ]
    },
    {
      title: 'CSS',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '2 CSS-基础',
        '3 CSS-传统布局',
        '4 CSS-现代布局',
        '5 CSS-高级技巧',
        '6 代码规范',
        '7 品优购案例',


      ]
    }
  ],

  // ---------------------Front End end---------------------------




  // ---------------------Environment start---------------------------
  '/Environment/macOS/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        'macOS',
      ]
    }
  ],
  '/Environment/Software/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        'Software',
      ]
    }
  ],
  // ---------------------Environment end-----------------------------

}