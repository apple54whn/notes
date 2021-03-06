module.exports = {
  // 多个侧边栏，暂不使用，侧边栏分组也可以实现

  // 侧边栏分组，只显示一组内容
  '/Basic/OS/Linux/': [
    {
      title: 'Linux',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['0 Intro', '1 Intro1', '2 Intro2'],
    },
  ],

  '/Basic/OS/Docker/': [
    {
      title: 'Docker',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['0 Docker', '1 Docker Compose'],
    },
  ],

  '/Basic/Network/': [
    {
      title: 'Network',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [],
    },
    {
      title: 'HTTP',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 1,
      children: [],
    },
  ],

  '/DataBase/RDBMS/': [
    {
      title: '运维',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['0 Primer'],
    },
  ],
  '/DataBase/Lucene/': [
    {
      title: 'Primer',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['0 Primer'],
    },
  ],
  '/DataBase/Solr/': [
    {
      title: 'Primer',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['0 Primer'],
    },
  ],
  '/DataBase/Elasticsearch/': [
    {
      title: 'Primer',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Primer',
        '1 配置',
        '2 部署',
        '3 插件',
        '4 Index & Document',
        '5 搜索',
        '5 原理',
      ],
    },
  ],

  // ---------------------Design start---------------------------
  '/Design/Design Pattern/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['0 Intro'],
    },
  ],
  '/Design/MicroServer/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['0 Intro'],
    },
  ],
  // ---------------------Design end-----------------------------

  // ---------------------Core Java start-----------------------
  '/Java/Core/': [
    {
      title: 'Basic Syntax',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['0 Basic', '1 Basic Syntax', '1 Basic Syntax-1 数组'],
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
      ],
    },
    {
      title: 'Error & Exception',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['3 Error & Exception'],
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
        '4 API-习题',
      ],
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
      ],
    },
    {
      title: 'Thread',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['7 Thread', '7 Thread2'],
    },
    {
      title: 'IO',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['8 IO', '9 NIO', '10 AIO'],
    },
    {
      title: 'Network',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['11 Network'],
    },
    {
      title: '函数式编程',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['13 Lambda', '14 Stream API', '15 Optional'],
    },
    {
      title: '类加载器与反射',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['12 Reflect'],
    },
    {
      title: 'Other',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['16 9,10,11新特性', '17 Test', '18 设计原则&设计模式'],
    },
  ],
  // ---------------------Core Java end-------------------------

  // ---------------------Jakarta EE start----------------------
  '/Java/Jakarta EE/': [
    {
      title: 'Jakarta EE',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['0 Servlet', '1 Filter', '2 Listener', '3 JSP'],
    },
  ],
  // ---------------------Jakarta EE end------------------------

  // -----------------Spring Framwork start--------------------
  '/Java/Spring/': [
    {
      title: 'Primer',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        './primer/0 Primer',
        './primer/1 SSM',
        './primer/2 Spring Boot',
        './primer/3 Conf',
        './primer/4 DB',
        './primer/5 Log',
      ],
    },
    {
      title: 'Spring',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        './spring/1 概述',
        './spring/2 IoC',
        './spring/3 容器&注册组件&注入组件',
        './spring/4 Bean的生命周期',
        './spring/5 属性赋值',
        './spring/6 AOP',
        './spring/7 声明式事务',
        './spring/99 工具类',
      ],
    },
    {
      title: 'SpringMVC',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        './springmvc/1 概述',
        './springmvc/2 路由&请求参数绑定',
        './springmvc/3 响应结果',
        './springmvc/4 Interceptor',
        './springmvc/5 ExceptionHandler',
        './springmvc/6 CORS',
        './springmvc/11 Jackson',
      ],
    },
    {
      title: 'Other',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['7 Test', 'Thymeleaf', 'Servlet 3.0'],
    },
    {
      title: 'Shiro',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['9 Shiro'],
    },
  ],
  // -----------------Spring Framwork end----------------------

  // -----------------Persistence Framwork start--------------------
  '/Java/Persistence/': [
    {
      title: 'Mybatis',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['./Mybatis/0 Primer'],
    },
    {
      title: 'Mybatis Plus 3.3.0',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        './Mybatis Plus/0 Primer',
        './Mybatis Plus/1 Conf',
        './Mybatis Plus/2 CRUD',
        './Mybatis Plus/3 Wrapper',
        './Mybatis Plus/4 Plugins',
        './Mybatis Plus/5 ActiveRecord',
      ],
    },
  ],
  // -----------------Persistence Framwork end----------------------

  // -----------------Service OAuth2 Framwork start--------------------
  '/Java/Authe&Autho/': [
    {
      title: 'Primer',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '0 Primer',
        '1 Session—1 Simple',
        '1 Session—2 Security',
        '2 Security—1 Boot',
        '2 Security—2 原理',
      ],
    },
  ],
  // -----------------Service OAuth2 Framwork end----------------------

  // ---------------------Server start---------------------------
  '/Server/Tomcat/': [
    {
      title: 'Tomcat',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['0 Primer'],
    },
  ],
  // ---------------------Server end---------------------------

  // ---------------------Tools start---------------------------
  '/Tools/Vim/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['Vim'],
    },
  ],
  '/Tools/Git/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['Git'],
    },
  ],
  '/Tools/Maven/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['Maven'],
    },
  ],
  // ---------------------Tools end-----------------------------

  // ---------------------Front End start---------------------------
  '/Front End/H5&CSS3/': [
    {
      title: 'HTML',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['1 HTML'],
    },
    {
      title: 'CSS',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '2 CSS-1 基础',
        '2 CSS-2 属性',
        '2 CSS-3 动画',
        '2 CSS-8 Less',
      ],
    },
    {
      title: 'CSS布局',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '3 CSS-1 盒子模型',
        '3 CSS-2 标准流',
        '3 CSS-3 浮动',
        '3 CSS-4 定位',
        '3 CSS-5 传统布局总结',
        '3 CSS-6 Flexible',
        '3 CSS-99 移动端适配',
      ],
    },
    {
      title: 'CSS布局案例',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '99 CSS项目案例——京东',
        '99 CSS项目案例——考拉',
        '88 代码规范',
        '5 CSS-高级技巧',
      ],
    },
  ],
  '/Front End/JS/': [
    {
      title: '入门',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['0 入门-0 入门', '0 入门-1 Web 应用的生命周期'],
    },
    {
      title: '函数',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '1 理解-0 函数的定义与参数',
        '1 理解-1 理解函数调用',
        '1 理解-2 this—函数上下文',
        '1 理解-3 作用域',
        '1 理解-4 闭包',
      ],
    },
    {
      title: '语法',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '2 语法-1 基础语法',
        '2 语法-1 ES6',
        '2 语法-2 Function',
        '3 标准内置对象-1 Object',
        '3 标准内置对象-2 String',
        '3 标准内置对象-3 Array',
        '3 标准内置对象-4 RegExp',
        '3 标准内置对象-5 Number',
        '3 标准内置对象-6 Math',
        '3 标准内置对象-7 Date',
        '3 标准内置对象-8 JSON',
        '3 标准内置对象-9 Set',
        '3 标准内置对象-10 Map',
        '4 面向对象',
        '5 异常',
      ],
    },
    {
      title: '异步',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '6 异步-1 定时器',
        '6 异步-2 Promise',
        '6 异步-3 async & await',
      ],
    },
    {
      title: '模块化',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '7 模块化-1 ES6模块化',
        '7 模块化-2 ES5模块化',
        '7 模块化-3 常见模块化规范',
      ],
    },
    {
      title: '网络',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['8 网络-1 Ajax'],
    },
    {
      title: 'DOM & BOM',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['DOM', 'BOM'],
    },
    {
      title: 'jQuery',
      collapsable: true, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['99 jQuery'],
    },
  ],
  '/Front End/NodeJS/': [
    {
      title: 'NodeJS',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['NodeJS-1 入门'],
    },
    {
      title: 'Webpack',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['Webpack-1 入门'],
    },
  ],
  '/Front End/Vue/': [
    {
      title: '入门 & 基础语法',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: [
        '1-1 Primer',
        '2-1 插值语法',
        '2-2 绑定属性',
        '2-3 计算属性和侦听器',
        '2-4 事件监听',
        '2-5 条件和循环',
        '2-6 表单双向绑定',
      ],
    },
    {
      title: '组件化开发',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['3-1 组件化开发', '3-2 插槽'],
    },
    {
      title: 'Vue CLI',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['4-1 Vue CLI入门'],
    },
    {
      title: 'Vue Router',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['5-1 Vue Router入门'],
    },
    {
      title: 'Vuex',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['3-1 组件化开发'],
    },
    {
      title: 'Axios',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['3-1 组件化开发'],
    },
  ],

  // ---------------------微信小程序 start---------------------------
  '/Front End/微信小程序/': [
    {
      title: '要点',
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['1-1 Primer'],
    },
  ],

  // ---------------------微信小程序 end---------------------------

  // ---------------------Front End end---------------------------

  // ---------------------Environment start---------------------------
  '/Environment/macOS/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['macOS'],
    },
  ],
  '/Environment/Windows/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['Windows'],
    },
  ],
  '/Environment/Software/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['IDEA', 'VSC', 'Software'],
    },
  ],
  // ---------------------Environment end-----------------------------

  // ---------------------Project start---------------------------
  '/Project/电商/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['简介'],
    },
  ],
  '/Project/十次方/': [
    {
      collapsable: false, // 控制 组 的 close
      sidebarDepth: 2,
      children: ['简介'],
    },
  ],
  // ---------------------Project end-----------------------------
}
