module.exports = [
  { text: 'Home', link: '/' },
  {
    text: 'Basic',
    items: [
      {
        text: 'OS', items: [
          { text: 'Linux', link: '/Basic/OS/Linux/0 Intro' },
          { text: 'Morden OS', link: '/Basic/OS/Morden OS/0 Intro' },
          { text: 'macOS', link: '/Basic/OS/macOS/0 Intro' }
        ]
      },
      {
        text: 'Network', items: [
          { text: 'TCP/IP', link: '/Basic/Network/TCP/IP/0 Intro' },
          { text: 'HTTP', link: '/Basic/Network/HTTP/0 Intro' }
        ]
      },
      {
        text: 'DataBase', items: [
          { text: 'MySQL', link: '/Basic/DataBase/MySQL/0 Intro' },
          { text: 'Oralce', link: '/Basic/DataBase/Oralce/0 Intro' },
          
          { text: 'Redis', link: '/Basic/DataBase/Redis/0 Intro' },
          { text: 'Mongo', link: '/Basic/DataBase/Mongo/0 Intro' },
          { text: 'Lucene', link: '/Basic/DataBase/Lucene/0 Intro' },
          { text: 'Solr', link: '/Basic/DataBase/Solr/0 Intro' },
          { text: 'Elasticsearch', link: '/Basic/DataBase/Elasticsearch/0 Intro' },

        ]
      },

    ]
  },
  {
    text: 'Java',
    ariaLabel: 'Java Study',
    items: [
      { text: 'Core', link: '/Java/Core/0 Basic' },
      {
        text: 'Persistence', items: [
          { text: 'Mybatis', link: '/language/chinese/' },
          { text: 'JPA', link: '/language/japanese/' }
        ]
      },
      {
        text: 'Service', items: [
          { text: 'Spring Boot', link: '/Java/Framwork/Service/Spring Boot/0 Primer' },
          { text: 'Dubbo', link: '/language/chinese/' },
          { text: 'Spring Cloud Netflix', link: '/language/japanese/' },
          { text: 'Spring Cloud Alibaba', link: '/language/japanese/' }

        ]
      },
    ]
  },
  {
    text: 'Design',
    items: [
      { text: 'Design Pattern', link: '/Design/Design Pattern/0 Intro' },
      { text: 'DDD', link: '/Design/DDD/0 Basic' },
      { text: 'MicroServer', link: '/Design/MicroServer/0 Intro' },
    ]
  },
  {
    text: 'Devops',
    items: [
      { text: 'Vim', link: '/Devops/Vim/Vim' },
      { text: 'Git', link: '/Devops/Git/Git' },
      { text: 'Maven', link: '/Devops/Maven/Maven' },
      { text: 'Docker', link: '/Devops/Docker/0 Docker' },
      { text: 'K8', link: '/Devops/K8/K8' },

    ]
  },

]