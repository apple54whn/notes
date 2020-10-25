(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{445:function(t,a,s){"use strict";s.r(a);var e=s(2),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"windows"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#windows"}},[t._v("#")]),t._v(" Windows")]),t._v(" "),s("h2",{attrs:{id:"scoop"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#scoop"}},[t._v("#")]),t._v(" Scoop")]),t._v(" "),s("p",[t._v("Scoop 的 "),s("a",{attrs:{href:"https://github.com/lukesampson/scoop",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub 仓库"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("Invoke-Expression "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("New-Object System.Net.WebClient"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(".DownloadString"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://get.scoop.sh'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# or shorter")]),t._v("\niwr -useb get.scoop.sh "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" iex\n")])])]),s("p",[t._v("有可能有问题，需要根据提示输入命令")]),t._v(" "),s("h3",{attrs:{id:"开启代理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#开启代理"}},[t._v("#")]),t._v(" 开启代理")]),t._v(" "),s("p",[t._v("没用过，只设置了 Git 代理速度即可跑满")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("scoop config proxy\n")])])]),s("h3",{attrs:{id:"开启其他库"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#开启其他库"}},[t._v("#")]),t._v(" 开启其他库")]),t._v(" "),s("p",[s("code",[t._v("extras")]),t._v(" 库可以下载其他软件，如 vscode，typora 等等")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("scoop bucket "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" extras\n")])])]),s("p",[s("code",[t._v("java")]),t._v(" 库")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("scoop bucket "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" java\n")])])]),s("p",[s("code",[t._v("JetBrains")]),t._v(" 库")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("scoop bucket add JetBrains\n")])])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("版本区别")]),t._v(" "),s("p",[t._v("不推荐使用 Tools")]),t._v(" "),s("p",[t._v("例如 IDEA Ultimate 目前有如下版本")]),t._v(" "),s("ul",[s("li",[t._v("IntelliJ-IDEA-Ultimate-EAP-portable (2020.1-201.4865.12)")]),t._v(" "),s("li",[t._v("IntelliJ-IDEA-Ultimate-EAP (2020.1-201.4865.12)")]),t._v(" "),s("li",[t._v("IntelliJ-IDEA-Ultimate-portable (2019.3.3-193.6494.35)")]),t._v(" "),s("li",[t._v("IntelliJ-IDEA-Ultimate-RC-portable (2019.3.3-193.6494.9)")]),t._v(" "),s("li",[t._v("IntelliJ-IDEA-Ultimate-RC (2019.3.3-193.6494.9)")]),t._v(" "),s("li",[t._v("IntelliJ-IDEA-Ultimate (2019.3.3-193.6494.35)")])]),t._v(" "),s("p",[t._v("区别取下：")]),t._v(" "),s("ul",[s("li",[t._v("EAP 为 Early Access Program，即为开发版本")]),t._v(" "),s("li",[t._v("RC 为 Release Candidate，即发行候选版")]),t._v(" "),s("li",[t._v("GA 为 General Availability，即发行版")]),t._v(" "),s("li",[t._v("portable 为便携版，可用 U 盘")])])]),t._v(" "),s("h3",{attrs:{id:"使用aria2多线程下载"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用aria2多线程下载"}},[t._v("#")]),t._v(" 使用"),s("code",[t._v("aria2")]),t._v("多线程下载")]),t._v(" "),s("p",[t._v("有时使用后更慢")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("scoop "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" aria2\n")])])]),s("h3",{attrs:{id:"sudo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sudo"}},[t._v("#")]),t._v(" sudo")]),t._v(" "),s("p",[t._v("省去切换管理员打开的烦恼")]),t._v(" "),s("div",{staticClass:"language-powershell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-powershell"}},[s("code",[t._v("scoop install sudo\n")])])]),s("h3",{attrs:{id:"导出软件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#导出软件"}},[t._v("#")]),t._v(" 导出软件")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("scoop "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" scoop.txt\n")])])]),s("p",[t._v("用 VSCode 打开 "),s("code",[t._v("scoop.txt")]),t._v(" 文件，以正则表达式"),s("code",[t._v("(.*?) .*")]),t._v("替换为"),s("code",[t._v("$1")]),t._v("，之后的文件如下：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("7zip\nadopt11-hotspot\nadopt8-hotspot\nconemu\ngit\ninnounp\nmaven\nmotrix\nsudo\ntypora\nvim\nvscode\n")])])]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# git 先安装，配置好代理")]),t._v("\nscoop "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v("\nscoop "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v("\nscoop "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("vim")]),t._v("\nscoop "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" adopt11-hotspot\nscoop "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" adopt8-hotspot\nscoop "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" maven\nscoop "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" vscode\nscoop "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" typora\nscoop "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" motrix\n")])])]),s("h2",{attrs:{id:"git"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#git"}},[t._v("#")]),t._v(" Git")]),t._v(" "),s("h3",{attrs:{id:"使用-scoop-安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用-scoop-安装"}},[t._v("#")]),t._v(" 使用 Scoop 安装")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("scoop search "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v("\nscoop "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 会先下载7zip，后下载git。7zip需手动设置右键菜单")]),t._v("\n")])])]),s("h3",{attrs:{id:"设置代理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设置代理"}},[t._v("#")]),t._v(" 设置代理")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 具体代理地址根据自己的代理软件配置")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global http.proxy http://127.0.0.1:1080\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global https.proxy https://127.0.0.1:1080\n")])])]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 取消代理")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global --unset http.proxy\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global --unset https.proxy\n")])])]),s("h2",{attrs:{id:"windows-terminal"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#windows-terminal"}},[t._v("#")]),t._v(" Windows Terminal")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/microsoft/terminal",target:"_blank",rel:"noopener noreferrer"}},[t._v("Github"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"安装-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-2"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),s("p",[t._v("Microsoft Store 中下载安装即可，不再赘述")]),t._v(" "),s("h3",{attrs:{id:"配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[t._v("#")]),t._v(" 配置")]),t._v(" "),s("h2",{attrs:{id:"powershell"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#powershell"}},[t._v("#")]),t._v(" PowerShell")]),t._v(" "),s("p",[t._v("参考该"),s("a",{attrs:{href:"https://github.com/spencerwooo/dotfiles",target:"_blank",rel:"noopener noreferrer"}},[t._v("仓库"),s("OutboundLink")],1),t._v("，他还写了篇少数派文章")]),t._v(" "),s("p",[t._v("在选择 powerline 字体时我只找到 source code pro 和 ubuntu 可以使用，其他没测完\nWindows Terminal 中可以试试 MesloLGS NF 字体")]),t._v(" "),s("h3",{attrs:{id:"安装-powershell"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-powershell"}},[t._v("#")]),t._v(" 安装 PowerShell")]),t._v(" "),s("p",[t._v("不是 Windows 自带的 PowerShell！")])])}),[],!1,null,null,null);a.default=n.exports}}]);