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


  // ---------------------Core Java start-----------------------
  '/Java/Core/': [
    {
      title: 'Basic Syntax',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Basic',
        '1 Basic Syntax',
      ]
    },
    {
      title: 'Object Orientation',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '2 Object Orientation-1 面向对象',
        '2 Object Orientation-2 抽象类&接口',
        '2 Object Orientation-3 枚举',
        '2 Object Orientation-4 注解',
        '2 Object Orientation-5 范型',
        '2 Object Orientation-6 访问控制',
        '2 Object Orientation-习题',

      ]
    },
    {
      title: 'Error & Exception',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '3 Error & Exception'
      ]
    },
    {
      title: 'API',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '4 API-1 字符串',
        '4 API-2 时间',
        '4 API-3 时间-old',
        '4 API-4 比较器',
        '4 API-5 精确数据类型',
        '4 API-6 Math',
        '4 API-7 Random',
        '4 API-8 System',
        '4 API-9 Object',
        '4 API-习题'
      ]
    },
    {
      title: 'Container',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '6 Container-1 数据结构',
        '6 Container-2 Collection',
        '6 Container-3 List',
        '6 Container-4 Set',
        '6 Container-5 Queue',
        '6 Container-6 Map',
        '6 Container-7 Collections',
        '6 Container-9 新API',
        '6 Container-习题',
      ]
    },
    {
      title: 'Thread',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '7 Thread',
        '7 Thread2'
      ]
    },
    {
      title: 'IO',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '8 IO',
        '9 NIO',
        '10 AIO'
      ]
    },
    {
      title: 'Network',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '11 Network'
      ]
    },
    {
      title: 'Lambda',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '13 Lambda'
      ]
    },
    {
      title: 'Stream',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '14 Stream API'
      ]
    },
    {
      title: 'Optional',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '15 Optional'
      ]
    },
    {
      title: '类加载器与反射',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '12 Reflect'
      ]
    },
    {
      title: 'Other',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '16 9,10,11新特性',
        '17 Test',
        '18 设计原则&设计模式',
      ]
    },
  ],
  // ---------------------Core Java end-------------------------


  // ---------------------Jakarta EE start----------------------
  '/Java/Jakarta EE/': [
    {
      title: 'Jakarta EE',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Servlet',
        '1 Filter',
        '2 Listener',
        '3 JSP'
      ]
    },
  ],
  // ---------------------Jakarta EE end------------------------



  // -----------------Service Framwork start--------------------
  '/Java/Service/Spring/': [
    {
      title: 'Primer',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Primer',
        '1 Conf',
        '2 DB',
        '3 Log'
      ]
    },
    {
      title: 'Spring',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '4 Spring-1 概述',
        '4 Spring-2 IoC',
        '4 Spring-3 AOP',
        '4 Spring-4 声明式事务',
        '4 Spring-5 工具类',
      ]
    },
    {
      title: 'SpringMVC',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '5 SpringMVC-1 概述',
        '5 SpringMVC-2 RESTful',
        '5 SpringMVC-3 Controller&Mapping',
        '5 SpringMVC-4 请求参数的绑定',
        '5 SpringMVC-5 响应结果',
        '5 SpringMVC-6 Multipart',
        '5 SpringMVC-7 ExceptionHandler',
        '5 SpringMVC-8 Interceptor',
        '5 SpringMVC-9 CORS',


      ]
    },
    {
      title: 'Other',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '6 Jackson',
        '7 Test',
        'Thymeleaf',
        'Servlet 3.0',

      ]
    },


  ],
  // -----------------Service Framwork end----------------------


  // -----------------Persistence Framwork start--------------------
  '/Java/Persistence/Mybatis/': [
    {
      title: 'Mybatis',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Primer',

      ]
    },
  ],
  '/Java/Persistence/Mybatis Plus/': [
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



  // ---------------------Server start---------------------------
  '/Server/Tomcat/': [
    {
      title: 'Tomcat',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Primer',



      ]
    },
  ],
  // ---------------------Server end---------------------------




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
        '7 项目案例',


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
  '/Environment/Windows/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        'Windows',
      ]
    }
  ],
  '/Environment/Software/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        'IDEA',
        'VSC',
        'Software',
      ]
    }
  ],
  // ---------------------Environment end-----------------------------


  // ---------------------Project start---------------------------
  '/Project/电商/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '简介',
      ]
    }
  ],
  '/Project/十次方/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '简介',
      ]
    }
  ],
  // ---------------------Project end-----------------------------

}