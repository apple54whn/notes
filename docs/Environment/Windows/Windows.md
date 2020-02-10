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



### 使用`aria2`多线程下载

```bash
scoop install aria2
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

