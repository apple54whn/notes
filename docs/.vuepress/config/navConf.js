module.exports = [
  { text: 'Home', link: '/' },
  {
    text: 'Java',
    ariaLabel: 'Java Study',
    items: [
      { text: 'Core', link: '/Java/0 Core/0 Basic' },
      {
        text: 'Persistence Layer Framework', items: [
          { text: 'Mybatis', link: '/language/chinese/' },
          { text: 'JPA', link: '/language/japanese/' }
        ]
      },
      {
        text: 'Microservices', items: [
          { text: 'Basic', link: '/language/chinese/' },
          { text: 'Dubbo & ZooKeeper', link: '/language/chinese/' },
          { text: 'SpringCloud Netflix', link: '/language/chinese/' },
          { text: 'SpringCLoud Alibaba', link: '/language/japanese/' }
        ]
      },
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
]