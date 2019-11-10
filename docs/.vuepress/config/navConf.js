module.exports = [
  { text: 'Home', link: '/' },
  {
    text: 'Java',
    ariaLabel: 'Java Study',
    items: [
      { text: 'Core', link: '/Java/Core/0 Basic' },
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