# macOS

## Homebrew

> [官方文档](https://brew.sh/index_zh-cn)，可能会很慢，你懂得

开源软件使用`brew install` 安装，安装目录在`/usr/local/Cellar`，且会`ln`到`/usr/local/bin`下

非开源软件使用`brew cask install`安装，安装目录在`/usr/local/Caskroom`

查找时都是使用`brew search *`

### 配置国内源

国内源有：

* [中科大源](http://mirrors.ustc.edu.cn/)
* [清华源](https://mirrors.tuna.tsinghua.edu.cn/)

此处以中科大源为示例，需要配置的有Homebrew、Homebrew Bottles、Homebrew Core、Homebrew Cask



## iTerm2

> [官方文档](https://www.iterm2.com/)，非开源软件。

### 使用 Homebrew 安装

安装前可先搜索下

```shell
~ ❯ brew search iterm2
==> Casks
iterm2 ✔                                 homebrew/cask-versions/iterm2-legacy
homebrew/cask-versions/iterm2-beta       homebrew/cask-versions/iterm2-nightly                    
```

返回结果显示已经安装了，若没有安装可执行如下命令

```shell
~ ❯ brew cask install iterm2
```



## Oh My ZSH

> [官方文档](https://ohmyz.sh/)，需要先安装ZSH（macOS Catalina 默认），文档里有详细步骤，包括主题配置等等。





## Git

> [官网](https://git-scm.com/)

macOS 自带的 Git 版本比较低

```shell
~ ❯ git --version
git version 2.21.0 (Apple Git-122.2)
```

替换方式如下：

### 使用 Homebrew 安装

安装命令

```shell
~ ❯ brew install git
```

修改环境变量

```shell
~ ❯ vim .zshrc

# custom environment variable
export GIT=/usr/local/Cellar/git/2.24.1
export PATH=$GIT/bin:$PATH
# 使用如下命令可以让Git命令保持英文（不知道什么时候改成中文了，根据系统设置吗）
alias git='LANG=en_GB git'

~ ❯ source .zshrc

~ ❯ git --version                                                         
git version 2.24.1
```





## SSH

> [Github 配置文档](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)

### 查看密钥

```shell
~ ❯ ll -a ~/.ssh
```

### 生成密钥

```shell
~ ❯ ssh-keygen -t rsa -b 4096 -C "54whn54@gmail.com"

~ ❯ ll -a ~/.ssh
-rw-------   1 conanan  staff   3.3K 12 17 13:17 id_rsa
-rw-r--r--   1 conanan  staff   743B 12 17 13:17 id_rsa.pub
```

### 生成新 SSH 密钥并添加到 ssh-agent

检查现有 SSH 密钥后，您可以生成新 SSH 密钥以用于身份验证，然后将其添加到 ssh-agent。将 SSH 密钥添加到该代理时，应使用默认的 macOS `ssh-add` 命令，而不是使用通过 [macports](https://www.macports.org/), [homebrew](http://brew.sh/) 或某些其他外部来源安装的应用程序。

在后台启动 ssh 代理

```shell
~ ❯ eval "$(ssh-agent -s)"
Agent pid 10387
```

如果您使用的是 macOS Sierra 10.12.2 或更高版本，则需要修改 `~/.ssh/config` 文件以自动将密钥加载到 ssh-agent 中并在密钥链中存储密码。

```
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa
```

将 SSH 私钥添加到 ssh-agent 并将密码存储在密钥链中。 If you created your key with a different name, or if you are adding an existing key that has a different name, replace *id_rsa* in the command with the name of your private key file.

```shell
~ ❯ ssh-add -K ~/.ssh/id_rsa
Identity added: /Users/conanan/.ssh/id_rsa (54whn54@gmail.com)
```

**注：**`-K` 选项位于 Apple 的 `ssh-add` 标准版本中，当您将 ssh 密钥添加到 ssh-agent 时，它会将密码存储在您的密钥链中。

如果您没有安装 Apple 的标准版本，可能会收到错误消息。 有关解决此错误的详细信息，请参阅“[错误：ssh-add：非法选项 -- K](https://help.github.com/cn/articles/error-ssh-add-illegal-option-k)”。



### 新增 SSH 密钥到 GitHub 帐户

```shell
~ ❯ pbcopy < ~/.ssh/id_rsa.pub
```

如果 `pbcopy` 不可用，可找到隐藏的 `.ssh` 文件夹，在常用的文本编辑器中打开该文件，并将其复制到剪贴板。





## SDKMAN

> [官网](https://sdkman.io/)，可能需要科学上网

### 安装 SDKMAN

打开终端输入如下命令安装

```shell
~ ❯ curl -s "https://get.sdkman.io" | bash
```

打开新终端窗口输入如下命令

```shell
~ ❯ source "$HOME/.sdkman/bin/sdkman-init.sh"
```

查看是否安装成功

```shell
~ ❯ sdk version
==== BROADCAST =================================================================
* 2019-12-16: Micronaut 1.2.8 released on SDKMAN! #micronautfw
* 2019-12-13: sbt 1.3.5 released on SDKMAN! #scala
* 2019-12-10: Vertx 3.8.4 released on SDKMAN! #vertx
================================================================================

SDKMAN 5.7.4+362
```

安装后会在`~/.zshrc`添加如下环境变量

```
#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="/Users/conanan/.sdkman"
[[ -s "/Users/conanan/.sdkman/bin/sdkman-init.sh" ]] && source "/Users/conanan/.sdkman/bin/sdkman-init.sh"
```



### 查看可以安装的 SDK

```shell
~ ❯ sdk ls # list。查看所有可以安装的 SDK ，查看详细介绍
```

```shell
~ ❯ sdk ls <Candidate> # list 查看指定候选 SDK 的版本，安装状态及使用状态等
~ ❯ sdk ls java # list 查看 Java 的版本，安装状态及使用状态等
```



### 安装 SDK

```shell
~ ❯ sdk i <Candidate> <Identifier> # install
~ ❯ sdk i java 11.0.5.j9-adpt  # install
```

默认安装目录为`$HOME/.sdkman`

* archives 为压缩包目录
* candidates 为具体安装目录，如`candidates/java/11.0.5.hs-adpt`
* src 为 SDKMAN 命令存放目录



### 卸载 SDK

```shell
~ ❯ sdk rm <><> # uninstall 
```



### 查看当前使用的 SDK

```shell
~ ❯ sdk c # current

Using:

java: 11.0.5.j9-adpt
```



### 切换当前 SDK 版本

```shell
~ ❯ sdk u <Candidate> <Identifier> # use
~ ❯ sdk u java 11.0.5.hs-adpt # use

Using java version 11.0.5.hs-adpt in this shell.
```



### 升级指定 SDK

```shell
sdk ug [Candidate]# upgrade 
```



### 更新 SDKMAN

```shell
sdk update
```







### 安装示例

#### Java

输入如下命令查看可以安装的SDK

```shell
sdk ls java # 查看可以安装的Java
```

搜索出来的 Java 版本很多，比如`AdoptOpenJDK` 的`j9`版本和`hs`版本（需要科学上网），`Amazon`版本，`Azul Zulu`版本，`GraalVM`等等。

安装一个OpenJ9版本的

```shell
sdk install java 11.0.5.j9-adpt
```

再安装一个HotSpot版本

```shell
sdk install java 11.0.5.hs-adpt
```



#### Maven

```
sdk ls maven [version]
```



## Node

### 使用 Homebrew 安装

```shell
brew install node # 会安装最新版，不一定是稳定版哦
```





## 常用软件

### VSCode

安装后`command + shift + p` ，输入`shell command`，选择安装 Code 到 PATH 中，之后就可以在命令行中输入 s`code [path]` 打开文件夹