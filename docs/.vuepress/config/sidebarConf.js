module.exports = {

  // 多个侧边栏，暂不使用，侧边栏分组也可以实现

  // 侧边栏分组，只显示一组内容
  '/Java/Core/': [
    {
      title: 'Core',
      collapsable: true, // 控制 组 的 colse
      sidebarDepth: 1,
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
    {
      title: 'Code',
      collapsable: true, // 控制 组 的 colse
      sidebarDepth: 1,
      children: [

      ]
    },





  ],
}