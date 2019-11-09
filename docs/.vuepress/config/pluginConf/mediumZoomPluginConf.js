module.exports = [
  'vuepress-plugin-zooming',
  {
    selector: 'img',
    delay: 1000,
    options: {
      bgColor: 'black',
      zIndex: 10000,
    },
  },
]