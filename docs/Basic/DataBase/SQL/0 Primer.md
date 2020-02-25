# 简介

此处仅记录 Oracle12c 的 Docker image 构建及使用过程。注意我在 Windows 中没有测试成功，WSL 中未尝试。

构建：

1.  Clone Oracle 准备的镜像构建[仓库](https://github.com/oracle/docker-images)（有该公司许多产品）

2.  在 [Oracle 官网](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html)下载需要构建镜像的 **Linux** 原版，此处为 Oracle Database 12c Release 2

3.  进入 1 的 `docker-images/OracleDatabase/SingleInstance/dockerfiles/12.2.0.1`，将 2 下载的文件放入该目录，其他版本类似。

4.  退出到上一级目录，找到有`buildDockerImage.sh`命令的目录，执行

    ```bash
    ./buildDockerImage.sh -v 12.2.0.1 -e
    
    -----------------含义如下-------------------
    -v: version to build, Choose one of: 11.2.0.2 12.1.0.2 12.2.0.1 .etc
    -e: creates image based on ‘Enterprise Edition’
    -s: creates image based on ‘Standard Edition 2’
    -x: creates image based on ‘Express Edition’
    -i: ignores the MD5 checksums
    ```

    注意在安装过程中需要联网（可能需要科学上网），因为他会下载oraclelinux:7-slim 和 yum install pre-install 的包

5.  等待 10 多分钟应该就好了，此时就可以查看 image，会有oracle linux 和 oracle database



创建容器并运行：

1.  我选择创建`/usr/local/docker/oracle12c/`并进入，执行

    ```bash
    docker run -d --name oracle12c \
      --privileged -v $(pwd)/oradata:/u01/app/oracle \
      -p 8080:8080 -p 1521:1521 oracle/database:12.2.0.1-ee
    ```

    数据库设置和数据将持久化到`$(pwd)/oradata`文件夹，端口将公开给 localhost 或 boot2docker 容器（Mac 和 Win）

2.  此时的数据库没有密码，需设置。此处设置为 oracle 

    ```bash
    docker exec b0 ./setPassword.sh oracle
    The Oracle base remains unchanged with value /opt/oracle
    
    SQL*Plus: Release 12.2.0.1.0 Production on Sat Feb 15 18:13:09 2020
    
    Copyright (c) 1982, 2016, Oracle.  All rights reserved.
    
    
    Connected to:
    Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production
    
    SQL>
    User altered.
    
    SQL>
    User altered.
    
    SQL>
    Session altered.
    
    SQL>
    User altered.
    
    SQL> Disconnected from Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production
    ```

3.  默认的 SID 为 `orclcdb`，使用 `system`或`sys`连接即可



将镜像上传至阿里云

1.  重命名镜像

    ```bash
    sudo docker tag imageId registry.cn-hangzhou.aliyuncs.com/con/oracle12c_r2:12.2.0.1-ee
    ```

2.  上传（慢得要死）

    ```bash
    sudo docker push registry.cn-hangzhou.aliyuncs.com/con/oracle12c_r2:12.2.0.1-ee
    ```

    