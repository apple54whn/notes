module.exports = [
  // { text: 'Home', link: '/' },
  {
    text: "Basic",
    items: [
      {
        text: "OS",
        items: [
          { text: "Linux", link: "/Basic/OS/Linux/0 Intro" },
          { text: "Docker", link: "/Basic/OS/Docker/0 Docker" },
          { text: "K8", link: "/Basic/OS/K8/0 Intro" },
        ],
      },
      {
        text: "Network",
        items: [
          { text: "TCP/IP", link: "/Basic/Network/TCP/IP/0 Intro" },
          { text: "HTTP", link: "/Basic/Network/HTTP/0 Intro" },
        ],
      },
    ],
  },
  {
    text: "DataBase",
    items: [
      { text: "RDBMS", link: "/DataBase/RDBMS/0 Primer" },
      { text: "Redis", link: "/DataBase/Redis/0 Intro" },
      { text: "Mongo", link: "/DataBase/Mongo/0 Intro" },
      { text: "Lucene", link: "/DataBase/Lucene/0 Primer" },
      { text: "Solr", link: "/DataBase/Solr/0 Primer" },
      { text: "Elasticsearch", link: "/DataBase/Elasticsearch/0 Primer" },
    ],
  },

  {
    text: "Design",
    items: [
      { text: "Design Pattern", link: "/Design/Design Pattern/0 Intro" },
      { text: "DDD", link: "/Design/DDD/0 Basic" },
      { text: "MicroServer", link: "/Design/MicroServer/0 Intro" },
    ],
  },

  {
    text: "Java",
    ariaLabel: "Java Study",
    items: [
      { text: "Core", link: "/Java/Core/0 Basic" },
      {
        text: "Jakarta EE",
        items: [{ text: "Servlet", link: "/Java/Jakarta EE/0 Servlet" }],
      },
      {
        text: "Service",
        items: [
          { text: "Spring", link: "/Java/Service/Spring/0 Primer" },
          { text: "Dubbo", link: "/language/chinese/" },
          { text: "Spring Cloud Netflix", link: "/language/japanese/" },
          { text: "Spring Cloud Alibaba", link: "/language/japanese/" },
        ],
      },
      {
        text: "Persistence",
        items: [
          { text: "Mybatis", link: "/Java/Persistence/Mybatis/0 Primer" },
          {
            text: "Mybatis Plus",
            link: "/Java/Persistence/Mybatis Plus/0 Primer",
          },
          { text: "JPA", link: "/language/japanese/" },
        ],
      },
    ],
  },
  {
    text: "Tools",
    items: [
      { text: "Vim", link: "/Tools/Vim/Vim" },
      { text: "Git", link: "/Tools/Git/Git" },
      { text: "Maven", link: "/Tools/Maven/Maven" },
    ],
  },
  {
    text: "Server",
    items: [
      { text: "Tomcat", link: "/Server/Tomcat/0 Primer" },
      { text: "Nginx", link: "/Server/Nginx/0 Primer" },
    ],
  },
  {
    text: "Front End",
    items: [
      { text: "H5&CSS3", link: "/Front End/H5&CSS3/1 HTML" },
      { text: "JS", link: "/Front End/JS/0 作用域和闭包" },
      { text: "NodeJS", link: "/Front End/NodeJS/NodeJS-1 入门" },
      { text: "Vue", link: "/Front End/Vue/1-1 Primer" },
      { text: "Android", link: "/Front End/Android/0 Intro" },
      { text: "Flutter", link: "/Front End/Flutter/0 Intro" },
    ],
  },
  {
    text: "Environment",
    items: [
      { text: "macOS", link: "/Environment/macOS/macOS" },
      { text: "Windows", link: "/Environment/Windows/Windows" },
      { text: "Software", link: "/Environment/Software/IDEA" },
    ],
  },

  {
    text: "Project",
    items: [
      { text: "电商", link: "/Project/电商/简介" },
      { text: "Linux", link: "/Environment/Linux/Linux" },
      { text: "Windows", link: "/Environment/Windows/Windows" },
      { text: "Software", link: "/Environment/Software/Software" },
    ],
  },
];
