# Docker Compose

## 简介

Compose 项目是 Docker 官方的开源项目，负责实现对 Docker 容器集群的快速**编排**（常用于开发测试环境，生产环境使用 K8S）。从功能上看，跟 OpenStack 中的 Heat 十分类似。其代码目前在 [https://github.com/docker/compose](http://www.qfdmy.com/wp-content/themes/quanbaike/go.php?url=aHR0cHM6Ly9naXRodWIuY29tL2RvY2tlci9jb21wb3Nl) 上开源。Compose 定位是 「定义和运行多个 Docker 容器的应用（Defining and running multi-container Docker applications）」，其前身是开源项目 Fig。

我们知道使用一个 Dockerfile 模板文件，可以让用户很方便的定义一个单独的应用容器。然而，在日常工作中，经常会碰到需要多个容器相互配合来完成某项任务的情况。例如要实现一个 Web 项目，除了 Web 服务容器本身，往往还需要再加上后端的数据库服务容器，甚至还包括负载均衡容器等。Compose 恰好满足了这样的需求。它允许用户通过一个单独的 **docker-compose.yml** 模板文件（YAML 格式）来定义一组相关联的应用容器为一个项目（Project）。Compose 中有两个重要的概念：

-   服务 (**Service**)：一个应用的**容器**，实际上可以包括若干运行相同镜像的容器实例。
-   项目 (**Project**)：由**一组关联的应用容器**组成的一个完整业务单元，在 docker-compose.yml 文件中定义。

Compose 的默认管理对象是项目，通过子命令对项目中的一组容器进行便捷地生命周期管理。Compose 项目由 Python 编写，实现上调用了 Docker 服务提供的 API 来对容器进行管理。因此，只要所操作的平台支持 Docker API，就可以在其上利用 Compose 来进行编排管理。



## 安装

Compose 支持 Linux、macOS、Windows 10 三大平台。详细查看官方文档https://docs.docker.com/compose/install/，Github 上也有https://github.com/docker/compose/releases。



## 命令

执行 Compose 命令，会自动下载镜像，运行容器。命令必须在 `docker-compose.yaml` 文件所在路径下执行。

启动

```bash
docker-compose up -d
```

停止

```bash
docker-compose down
```



## Tomcat

在`/usr/local/docker/tomcat`下编写 `docker-compose.yaml` 文件，如下面的 tomcat 配置文件

```yaml
version: '3.1'
services:
  tomcat:
    restart: always
    image: tomcat
    container_name: tomcat
    ports:
      - 8080:8080
    volumes: # 数据卷
      - ./webapps:/usr/local/tomcat/webapps # 宿主机:容器
    environment:
      TZ: Asia/Shanghai # 时区，Linux 中没有北京时间，只有上海和重庆
```

该目录中执行如下命令即可以守护进程运行 Tomcat。命令上

>   **数据卷volumes**由来：由于容器的 IO 操作会给磁盘读写数据，但是都是**临时**的，容器删除后就没有了（举例类与对象）。所以 Docker 提供了“数据卷volumes”，容器的 IO 操作会写入数据卷 volumes 中，volumes 和磁盘有关连（如配置中的映射），共享数据（有则都有）。可以直接给宿主机的该目录添加东西，自动映射到容器的目录中。运行上述 Tomcat容器后会发现配置的当前目录下多了一个 webapps 目录。



## MySQL

```yaml
version: '3.1'
services:
  db:
    # 目前 latest 版本为 MySQL8.x
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 123456
    command:
      --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
      --lower_case_table_names=1
    ports:
      - 3306:3306
    volumes:
      - ./data:/var/lib/mysql
  # MySQL 的 Web 客户端。此处只是说明下一个 Compose Project 中可以写多个 Service
  adminer:
    image: adminer
    restart: always
    ports:
      - 8081:8080 # 宿主机的8080端口可能被占用，需要修改
```

>   adminer这个 web 站点有个“变量”，可以查看“command”的配置，还能跳转到官网详细介绍页面



## GitLab

### 部署

GitLab 是利用 Ruby on Rails 一个开源的版本管理系统，实现一个自托管的 Git 项目仓库，可通过 Web 界面进行访问公开的或者私人项目。它拥有与 Github 类似的功能，能够浏览源代码，管理缺陷和注释。可以管理团队对仓库的访问，它非常易于浏览提交过的版本并提供一个文件历史库。团队成员可以利用内置的简单聊天程序 (Wall) 进行交流。它还提供一个代码片段收集功能可以轻松实现代码复用，便于日后有需要的时候进行查找。

GitLab的安装需要很多步骤，可以通过手动安装，手动制作 Dockerfile，制作 Compose 来练习。

我们使用 Docker 来安装和运行 GitLab 中文版，`docker-compose.yml` 配置如下（可以在 Hub 中查找该 [compose](https://hub.docker.com/r/twang2218/gitlab-ce-zh)，注意修改自己主机的 IP 或域名）：

```yaml
version: '3'
services:
    web:
      image: 'twang2218/gitlab-ce-zh'
      restart: always
      hostname: '172.16.154.12'
      environment:
        TZ: 'Asia/Shanghai'
        GITLAB_OMNIBUS_CONFIG: |
          external_url 'http://172.16.154.12'
          gitlab_rails['gitlab_shell_ssh_port'] = 2222
          unicorn['port'] = 8888
          nginx['listen_port'] = 80
      ports:
        - '80:80'
        - '443:443'
        - '2222:22'
      volumes:
        - ./config:/etc/gitlab
        - ./data:/var/opt/gitlab
        - ./logs:/var/log/gitlab
```

>   该项目文档中提供有`run`命令
>
>   ```bash
>   docker run -d \
>       --hostname gitlab.example.com \
>       -p 80:80 \
>       -p 443:443 \
>       -p 22:22 \
>       --name gitlab \
>       --restart unless-stopped \
>       -v gitlab-config:/etc/gitlab \
>       -v gitlab-logs:/var/log/gitlab \
>       -v gitlab-data:/var/opt/gitlab \
>       --network gitlab-net \
>       twang2218/gitlab-ce-zh:11.1.4
>   ```
>
>   虽然文档中也提供了 Compose，但是我们需要学会如何将它转换为 Compose 文件
>
>   ```yaml
>   version: '2'
>   services:
>       gitlab:
>         image: 'twang2218/gitlab-ce-zh:11.1.4'
>         restart: unless-stopped
>         hostname: 'gitlab.example.com'
>         environment:
>           TZ: 'Asia/Shanghai'
>           GITLAB_OMNIBUS_CONFIG: |
>             external_url 'http://gitlab.example.com'
>             gitlab_rails['time_zone'] = 'Asia/Shanghai'
>             # 需要配置到 gitlab.rb 中的配置可以在这里配置，每个配置一行，注意缩进。
>             # 比如下面的电子邮件的配置：
>             # gitlab_rails['smtp_enable'] = true
>             # gitlab_rails['smtp_address'] = "smtp.exmail.qq.com"
>             # gitlab_rails['smtp_port'] = 465
>             # gitlab_rails['smtp_user_name'] = "xxxx@xx.com"
>             # gitlab_rails['smtp_password'] = "password"
>             # gitlab_rails['smtp_authentication'] = "login"
>             # gitlab_rails['smtp_enable_starttls_auto'] = true
>             # gitlab_rails['smtp_tls'] = true
>             # gitlab_rails['gitlab_email_from'] = 'xxxx@xx.com'
>         ports:
>           - '80:80'
>           - '443:443'
>           - '22:22'
>         volumes:
>           - config:/etc/gitlab
>           - data:/var/opt/gitlab
>           - logs:/var/log/gitlab
>   volumes: # 这里的数据卷，由于上面的数据卷配置后没有访问权限，所以这里配置，其目录会在/var/lib/docker/volumes下
>       config:
>       data:
>       logs:
>   ```

*   登录80端口，设置管理员初始密码，这里的密码最好是 **字母 + 数字组合，并且大于等于 8 位**
*   配置完成后登录，管理员账号是 **root**
*   第一次使用时可以做一些初始化设置，点击 **管理区域** -> **设置**
*   可以关闭Gravatar头像。由于 Gravatar 头像为网络头像，在网络情况不理想时可能导致访问时卡顿
*   注册限制：由于是内部代码托管服务器，可以直接关闭注册功能，由管理员统一创建用户即可
*   创建账户，点击 **管理区域** -> **新建用户**，设置自己为管理员，不应该使用 root 账户来登录操作
*   修改用户密码，由于我们创建时并没有配置邮箱，所以还需要重新编辑用户信息并手动设置密码。第一次登录还是会提示修改密码，直接用原密码修改即可
*   **新建项目**

### SSH 方式

*   目的：
    *   安全：无密码
    *   方便
    *   CI/CD 做准备

*   生成 SSH KEY

    使用 ssh-keygen 工具生成，若本机有则没必要生成

    Windows 中该工具位置在 Git 安装目录下（Win10好像自带有）macOS 自带，输入命令：

    ```sh
    ssh-keygen -t rsa -C "your_email@example.com"
    ```

*   生成的密钥的公钥位置在

    *   Win10：`C:\Users\你的用户名\.ssh` 目录下的 `id_rsa.pub` 
    *   macOS：`/Users/conanan/.ssh`目录下的 `id_rsa.pub` 

    将其内容复制到 GitLab 的 SSH 中，之后就可以免密 pull、push 等操作了。此时该仓库自动改为 SSH 链接的 URL 了，并且SSH 端口变为2222，这是由于上面的 compose 配置为此。也可以将宿主机 SSH 端口改为其他的，详细看该 compose 文档。

    

### 小 Case

*   Gravatar

    全球公认头像，可以输入邮箱后自动查找



## Nexus

Nexus 是一个强大的 Maven 仓库管理器，极大地简化了内部仓库的维护和外部仓库的访问。2016 年 4 月 6 日 Nexus 3.0 版本发布，相较 2.x 版本有了很大的改变

-   对低层代码进行了大规模重构，提升性能，增加可扩展性以及改善用户体验。
-   升级界面，极大的简化了用户界面的操作和管理。
-   提供新的安装包，让部署更加简单。
-   增加对 Docker, NeGet, npm, Bower 的支持。
-   提供新的管理接口，以及增强对自动任务的管理。

### 部署

我们使用 Docker 来安装和运行 Nexus，`docker-compose.yml` 配置如下：

```yaml
version: '3.1'
services:
  nexus:
    restart: always
    image: sonatype/nexus3
    container_name: nexus
    ports:
      - 8081:8081
    volumes:
      - data:/nexus-data
volumes: # 其文件会在/var/lib/docker/volumes/nexus_data/下，前缀 nexus 是由于配置文件所在目录名
  data:
```

### 验证安装是否成功

-   **地址：** [http://ip:port/](http://www.qfdmy.com/wp-content/themes/quanbaike/go.php?url=aHR0cDovL2lwOnBvcnQv)
-   **用户名：** admin
-   **密码：** 在 `cat /var/lib/docker/volumes/nexus_data/_data/admin.password`中，第一次进入后提示可修改，可改为 admin123456

### Maven 仓库介绍

*   代理仓库(Proxy Repository)
    *   第三方仓库
        -   **maven-central**
        -   **nuget.org-proxy**
    *   版本策略(Version Policy)
        -   **Release：** 正式版本
        -   **Snapshot：** 快照版本
        -   **Mixed：** 混合模式
    *   布局策略(Layout Policy)
        -   **Strict：** 严格
        -   **Permissive：** 宽松
*   宿主仓库(Hosted Repository)
    *   存储本地上传的组件和资源的
        -   **maven-releases**
        -   **maven-snapshots**
        -   **nuget-hosted**
    *   部署策略(Deployment Policy)
        -   **Allow Redeploy：** 允许重新部署
        -   **Disable Redeploy：** 禁止重新部署
        -   **Read-Only：** 只读
*   仓库组(Repository Group)：通常包含了多个代理仓库和宿主仓库，在项目中只要引入仓库组就可以下载到代理仓库和宿主仓库中的包
    *   **maven-public**
    *   **nuget-group**



### 在项目中使用 Nexus

#### 从私服下载

**配置代理仓库**（不过需要注释掉之前的 mirror 镜像，否则不起作用）

```xml
<repositories>
    <repository>
        <id>nexus</id>
        <name>Nexus Repository</name>
        <url>http://172.16.154.12:8081/repository/maven-public/</url>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
        <id>nexus</id>
        <name>Nexus Plugin Repository</name>
        <url>http://172.16.154.12:8081/repository/maven-public/</url>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </pluginRepository>
</pluginRepositories>
```

#### 部署到私服

**配置自动化部署到私服**

*   **配置认证信息**，在 Maven `settings.xml` 中添加 Nexus 认证信息 (**servers** 节点下)

    ```xml
    <server>
      <id>nexus-releases</id>
      <username>admin</username>
      <password>admin123456</password>
    </server>
    <server>
      <id>nexus-snapshots</id>
      <username>admin</username>
      <password>admin123456</password>
    </server>
    ```

    Release 版本与 Snapshot 定义

    ```xml
    Release: 1.0.0/1.0.0-RELEASE
    Snapshot: 1.0.0-SNAPSHOT
    ```

    *   在项目 `pom.xml` 中设置的版本号添加 `SNAPSHOT` 标识的都会发布为 `SNAPSHOT` 版本，没有 `SNAPSHOT` 标识的都会发布为 `RELEASE` 版本。
    *   `SNAPSHOT` 版本会自动加一个时间作为标识，如：`1.0.0-SNAPSHOT` 发布后为变成 `1.0.0-SNAPSHOT-20180522.123456-1.jar`

*   **配置发布管理**，在 `pom.xml` 中添加如下代码

    ```xml
    <distributionManagement>  
      <repository>  
        <id>nexus-releases</id>  
        <name>Nexus Release Repository</name>  
        <url>http://172.16.154.12:8081/repository/maven-releases/</url>  
      </repository>  
      <snapshotRepository>  
        <id>nexus-snapshots</id>  
        <name>Nexus Snapshot Repository</name>  
        <url>http://172.16.154.12:8081/repository/maven-snapshots/</url>  
      </snapshotRepository>  
    </distributionManagement> 
    ```

    **注意事项**

    -   ID 名称必须要与 `settings.xml` 中 Servers 配置的 ID 名称保持一致
    -   项目版本号中有 `SNAPSHOT` 标识的，会发布到 Nexus Snapshots Repository， 否则发布到 Nexus Release Repository，并根据 ID 去匹配授权账号

*   **部署到仓库**

    ```bash
    mvn deploy
    ```



### 扩展阅读

*   手动上传第三方依赖（解决通过 POM 下载不下来的依赖）

    Nexus 3.1.x 开始支持页面上传第三方依赖功能（左侧菜单有 Upload），以下为手动上传命令

    ```bash
    # 如第三方JAR包：aliyun-sdk-oss-2.2.3.jar
    mvn deploy:deploy-file 
      -DgroupId=com.aliyun.oss 
      -DartifactId=aliyun-sdk-oss 
      -Dversion=2.2.3 
      -Dpackaging=jar 
      -Dfile=D:\aliyun-sdk-oss-2.2.3.jar 
      -Durl=http://127.0.0.1:8081/repository/maven-3rd/ 
      -DrepositoryId=nexus-releases
    ```

    **注意事项**

    *   建议在上传第三方 JAR 包时，创建单独的第三方 JAR 包管理仓库，便于管理有维护。（maven-3rd）
    *   `-DrepositoryId=nexus-releases` 对应的是 `settings.xml` 中 **Servers** 配置的 ID 名称。（授权）





## Harbor

### 简介

Harbor 是一个用于存储和分发 Docker 镜像的企业级 Registry 服务器，通过添加一些企业必需的功能特性，例如安全、标识和管理等，扩展了开源 Docker Distribution。作为一个企业级私有 Registry 服务器，Harbor 提供了更好的性能和安全。提升用户使用 Registry 构建和运行环境传输镜像的效率。Harbor 支持安装在多个 Registry 节点的镜像资源复制，镜像全部保存在私有 Registry 中， 确保数据和知识产权在公司内部网络中管控。另外，Harbor 也提供了高级的安全特性，诸如用户管理，访问控制和活动审计等。

### Harbor 特性

-   **基于角色的访问控制 ：** 用户与 Docker 镜像仓库通过 “项目” 进行组织管理，一个用户可以对多个镜像仓库在同一命名空间（project）里有不同的权限。
-   **镜像复制 ：** 镜像可以在多个 Registry 实例中复制（同步）。尤其适合于负载均衡，高可用，混合云和多云的场景。
-   **图形化用户界面 ：** 用户可以通过浏览器来浏览，检索当前 Docker 镜像仓库，管理项目和命名空间。
-   **AD/LDAP 支持 ：** Harbor 可以集成企业内部已有的 AD/LDAP，用于鉴权认证管理。
-   **审计管理 ：** 所有针对镜像仓库的操作都可以被记录追溯，用于审计管理。
-   **国际化 ：** 已拥有英文、中文、德文、日文和俄文的本地化版本。更多的语言将会添加进来。
-   **RESTful API ：** RESTful API 提供给管理员对于 Harbor 更多的操控，使得与其它管理软件集成变得更容易。
-   **部署简单 ：** 提供在线和离线两种安装工具， 也可以安装到 vSphere 平台 (OVA 方式) 虚拟设备。

### Harbor 组件

-   **Proxy：** Harbor 的 registry, UI, token 等服务，通过一个前置的反向代理统一接收浏览器、Docker 客户端的请求，并将请求转发给后端不同的服务。
-   **Registry：** 负责储存 Docker 镜像，并处理 docker push/pull 命令。由于我们要对用户进行访问控制，即不同用户对 Docker image 有不同的读写权限，Registry 会指向一个 token 服务，强制用户的每次 docker pull/push 请求都要携带一个合法的 token, Registry 会通过公钥对 token 进行解密验证。
-   **Core services**：这是 Harbor 的核心功能，主要提供以下服务：
    -   **UI：** 提供图形化界面，帮助用户管理 registry 上的镜像（image）, 并对用户进行授权。
    -   **WebHook：** 为了及时获取 registry 上 image 状态变化的情况， 在 Registry 上配置 webhook，把状态变化传递给 UI 模块。
    -   **Token：** 负责根据用户权限给每个 docker push/pull 命令签发 token. Docker 客户端向 - Registry 服务发起的请求，如果不包含 token，会被重定向到这里，获得 token 后再重新向 Registry 进行请求。
-   **Database：** 为 core services 提供数据库服务，负责储存用户权限、审计日志、Docker image 分组信息等数据。
-   **Job Services：** 提供镜像远程复制功能，可以把本地镜像同步到其他 Harbor 实例中。
-   **Log Collector：** 为了帮助监控 Harbor 运行，负责收集其他组件的 log，供日后进行分析。

![img](./images/3eb420c96b75b44.png)



### Harbor 安装

[Harbor GitHub](https://github.com/goharbor/harbor) 有详细介绍

*   解压

    ```bash
    tar xvf harbor-offline-installer-v1.10.0-
    ```

*   修改配置文件

    ```bash
    cd harbor/
    vim harbor.yml
    
    # 修改为域名或你服务器 IP
    hostname: 172.16.154.12
    
    http: 
    	port: 8082 # 端口根据需要修改
    https: # 不需要 https 则先注释掉 https 的 attribute
    	# port: 443
    	# ...
    harbor_admin_password: Harbor12345 # 密码也可以修改
    ```

*   执行安装脚本

    ```bash
    ./install.sh
    
    # 会执行5步
    ✔ ----Harbor has been installed and started successfully.----
    ```

    通过浏览器访问 http://172.16.154.12:8082/，即可看到登录页面。输入账号 `admin`，密码 `Harbor12345`



### Harbor 启动和停止

Harbor 的日常运维管理是通过 docker-compose 来完成的，Harbor 本身有多个服务进程，都放在 docker 容器之中运行，我们可以通过 `docker ps` 命令查看。

```bash
docker ps | grep goharbor
```

```bash
# 启动
docker-compose start # 也可以 up
# 停止
docker-compose stop # 也可以 down
# 重启
docker-compose restart
```

**说明：**

-   **nginx：** nginx 负责流量转发和安全验证，对外提供的流量都是从 nginx 中转，所以开放 https 的 443 端口，它将流量分发到后端的 ui 和正在 docker 镜像存储的 docker registry
-   **harbor-jobservice：**harbor-jobservice 是 harbor 的 job 管理模块，job 在 harbor 里面主要是为了镜像仓库之前同步使用的
-   **harbor-ui：** harbor-ui 是 web 管理页面，主要是前端的页面和后端 CURD 的接口
-   **registry：** registry 就是 docker 原生的仓库，负责保存镜像
-   **harbor-adminserver：** harbor-adminserver 是 harbor 系统管理接口，可以修改系统配置以及获取系统信息
-   **harbor-db：** harbor-db 是 harbor 的数据库，这里保存了系统的 job 以及项目、人员权限管理。由于本 harbor 的认证也是通过数据，在生产环节大多对接到企业的 ldap 中
-   **harbor-log：** harbor-log 是 harbor 的日志服务，统一管理 harbor 的日志。通过 inspect 可以看出容器统一将日志输出的 syslog

这几个容器通过 Docker link 的形式连接在一起，这样，在容器之间可以通过容器名字互相访问。对终端用户而言，只需要暴露 proxy （即 Nginx）的服务端口。



### Harbor 配置客户端

在 `/etc/docker/daemon.json` 中增加如下内容（如果文件不存在请新建该文件）

```json
{
  "registry-mirrors": ["https://1c0pd0qz.mirror.aliyuncs.com"],
  "insecure-registries": ["172.16.154.12:8082"]
}
```

该文件必须符合 JSON 规范，否则 Docker 将不能启动。

重启服务

```bash
systemctl daemon-reload
systemctl restart docker # 容器多，需要时间
```

检查客户端配置是否生效

```bash
docker info
# ------信息如下-----------
Insecure Registries:
  172.16.154.12:8082
  127.0.0.0/8
```





### Harbor 上传镜像

我们以推送 Nginx 为例，首先需要在 Harbor 上创建一个 **公开/私有** 的项目

```bash
# 在项目中标记镜像：
docker tag SOURCE_IMAGE[:TAG] 172.16.154.12:8082/myshop/IMAGE[:TAG]
docker tag nginx 172.16.154.12:8082/myshop/nginx:latest
# 查看标记的镜像
172.16.154.12:8082/myshop/nginx   latest    231d40e811cd    2 weeks ago    126MB

# 登录 Harbor，私有项目需要登录
docker login 172.16.154.12:8082 -u admin -p Harbor12345

# 推送镜像到当前项目
docker push 172.16.154.12:8082/myshop/IMAGE[:TAG]
docker push 172.16.154.12:8082/myshop/nginx:latest
```

进入 Harbor 站点即可看到 push 的镜像了



### Harbor 下载镜像

在其它机器下载镜像只需要配置好客户端即可

```bash
docker pull 172.16.154.12:8082/myshop/nginx:latest
```



## 网络配置

### 简介

>   注意：Compose 只能用于同一台服务器上网络共享，多台之间不可以，所以只能用于测试环境，生产环境需要 K8S

默认情况下，Compose 会为我们的应用创建一个网络，服务的每个容器都会加入该网络中。这样，容器就可被该网络中的其他容器访问，不仅如此，**该容器还能以服务名称作为 Hostname 被其他容器访问**。

默认情况下，应用程序的网络名称基于 Compose 的工程名称，而项目名称基于 `docker-compose.yml` 所在目录的名称。如需修改工程名称，可使用 `--project-name` 标识或 `COMPOSE_PORJECT_NAME` 环境变量。

假如一个应用程序在名为 `myapp` 的目录中，并且 `docker-compose.yml` 如下所示：

```yaml
version: '2'
services:
  web:
    build: .
    ports:
      - "8000:8000"
  db:
    image: postgres
```

当我们运行 `docker-compose up` 时，将会执行以下几步：

-   创建一个名为 **myapp_default** 的网络
-   使用 web 服务的配置创建容器，它以 **web** 这个名称加入网络 myapp_default
-   使用 db 服务的配置创建容器，它以 **db** 这个名称加入网络 myapp_default

容器间可使用服务名称（web 或 db）作为 Hostname 相互访问。例如，web 这个服务可使用 `postgres://db:5432` 访问 db 容器。

当服务的配置发生更改时，可使用 `docker-compose up` 命令更新配置。此时，Compose 会删除旧容器并创建新容器。新容器会以不同的 IP 地址加入网络，名称保持不变。任何指向旧容器的连接都会被关闭，容器会重新找到新容器并连接上去。



### 使用 links

默认情况下，服务之间可使用服务名称相互访问。links 允许我们定义一个别名，从而使用该别名访问其他服务。

```yaml
version: '2'
services:
  web:
    build: .
    links:
      - "db:database"
  db:
    image: postgres
```

### 自定义网络

一些场景下，默认的网络配置满足不了我们的需求，此时我们可使用 `networks` 命令自定义网络。networks 命令允许我们创建更加复杂的网络拓扑并指定自定义网络驱动和选项。不仅如此，我们还可使用 networks 将服务连接到不是由 Compose 管理的、外部创建的网络。

```yaml
version: '2'
services:
  proxy:
    build: ./proxy
    networks:
      - front
  app:
    build: ./app
    networks:
      - front
      - back
  db:
    image: postgres
    networks:
      - back
networks:
  front:
    # Use a custom driver
    driver: custom-driver-1
  back:
    # Use a custom driver which takes special options
    driver: custom-driver-2
    driver_opts:
      foo: "1"
      bar: "2"
```

其中，proxy 服务与 db 服务隔离，两者分别使用自己的网络；app 服务可与两者通信。使用 networks 命令，即可方便实现服务间的网络隔离与连接。

### 配置默认网络

```yaml
version: '2'
services:
  web:
    build: .
    ports:
      - "8000:8000"
  db:
    image: postgres
networks:
  default:
    # Use a custom driver
    driver: custom-driver-1
```

这样，就可为该应用指定自定义的网络驱动

### 已存在的网络

我们可以预先创建一个名为 myapp 的网络，让 Compose 加入这个新创建的网络（配置文件配置如下），使所有 Compose 可以通信，此时使用 external 选项。

```bash
# 创建网络
docker network create <Network Name>
# 查看已存在的网络
docker network list
```

```yaml
networks:
  default:
    external:
      name: myapp
```







## 一次构建，到处运行

从 Dockerfile 到 Docker Compose 的编写，到 push 到 Harbor

