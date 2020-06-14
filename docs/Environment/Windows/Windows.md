# Windows

## Scoop

Scoop 的 [GitHub 仓库](https://github.com/lukesampson/scoop)

### 安装

```bash
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

# or shorter
iwr -useb get.scoop.sh | iex
```

有可能有问题，需要根据提示输入命令

### 开启代理

没用过，只设置了 Git 代理速度即可跑满

```bash
scoop config proxy
```

### 开启其他库

`extras` 库可以下载其他软件，如 vscode，typora 等等

```bash
scoop bucket add extras
```

`java` 库

```bash
scoop bucket add java
```

`JetBrains` 库

```
scoop bucket add JetBrains
```

::: tip 版本区别

不推荐使用 Tools

例如 IDEA Ultimate 目前有如下版本

- IntelliJ-IDEA-Ultimate-EAP-portable (2020.1-201.4865.12)
- IntelliJ-IDEA-Ultimate-EAP (2020.1-201.4865.12)
- IntelliJ-IDEA-Ultimate-portable (2019.3.3-193.6494.35)
- IntelliJ-IDEA-Ultimate-RC-portable (2019.3.3-193.6494.9)
- IntelliJ-IDEA-Ultimate-RC (2019.3.3-193.6494.9)
- IntelliJ-IDEA-Ultimate (2019.3.3-193.6494.35)

区别取下：

- EAP 为 Early Access Program，即为开发版本
- RC 为 Release Candidate，即发行候选版
- GA 为 General Availability，即发行版
- portable 为便携版，可用 U 盘

:::

### 使用`aria2`多线程下载

有时使用后更慢

```bash
scoop install aria2
```

### sudo

省去切换管理员打开的烦恼

```powershell
scoop install sudo
```

### 导出软件

```bash
scoop export > scoop.txt
```

用 VSCode 打开 `scoop.txt` 文件，以正则表达式`(.*?) .*`替换为`$1`，之后的文件如下：

```
7zip
adopt11-hotspot
adopt8-hotspot
conemu
git
innounp
maven
motrix
sudo
typora
vim
vscode
```

```bash
# git 先安装，配置好代理
scoop install git
scoop install sudo
scoop install vim
scoop install adopt11-hotspot
scoop install adopt8-hotspot
scoop install maven
scoop install vscode
scoop install typora
scoop install motrix
```

## Git

### 使用 Scoop 安装

```bash
scoop search git
scoop install git
# 会先下载7zip，后下载git。7zip需手动设置右键菜单
```

### 设置代理

```bash
# 具体代理地址根据自己的代理软件配置
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080
```

```bash
# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## PowerShell

参考该[仓库](https://github.com/spencerwooo/dotfiles)，他还写了篇少数派文章

在选择 powerline 字体时我只找到 source code pro 和 ubuntu 可以使用，其他没测完
Windows Terminal 中可以试试 MesloLGS NF 字体
