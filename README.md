# 说明

这是我们在 <https://yjzx-site.github.io> 上面的网站源码。

如果对 float-site-manager 不熟悉的请到 [float-site-manager](https://github.com/floatingblocks/float-site-manager) 处重新看下。

## 备选方案

鉴于上回很多人搭建不起来平台，这样可能就没法通过常规流程提交过来。因此我决定开启这个备选方案。

把 html 或者 markdown 格式的文章和用到的资源文件一起打 zip 包发到邮箱 nethermobs@foxmail.com 。

邮件正文按照如下格式填写

``` text
作者：
标题：
分类：
标签：
简介：
```

我们会进行手动同步到网站上。

当然除非万不得已我不推荐这么做。毕竟捣鼓各种软件安装也是提升自己计算机技能的方式。

## 流程

先按照 [float-site-manager](https://github.com/floatingblocks/float-site-manager) 处的配置部分安装需要的软件。

首先，登录 Github 帐号。

其次，点击这个项目的 “fork”，创建一个自己的分支。

接下来，打开一个文件夹，右键打开 git bash，输入下面命令：

``` sh
git clone https://github.com/[换成你的用户名]/yjzx-site-source.git
```

接下来你会看到这个目录下面多出一个叫做 yjzx-site-source 的文件夹。用 VSCode 打开它（拖到 VSCode 图标上面）。按 Ctrl + Shift + \` 打开命令行。

在打开的命令行里面输入：

``` sh
npm install
```

这样，你就可以通过那边文档里面提到的方式去创建属于自己的页面了。

目前我们开放下面的分类（category）：

- 异兽录：写怺冢的异兽（人物）
- 风物志：介绍怺冢风情（？？？）
- 怺冢秘史：一些事迹。

随随便便填写其他的分类，小心给 reject 掉哦！

标签（Tags）目前没啥限制，里面可以随便填。

写好之后，你可以用这样的命令进行预览：

``` sh
# 渲染文件
npx float-site-manager g
# 开启本地服务器，之后就能在浏览器打开
npx float-site-manager s
```

别的文件不要乱改，小心到时候合并不进去

预览完成之后，确认无误，就可以上传到 github 了。

上传 github 使用的密码不是帐号的密码，而是 Acess Token，具体看 [这里](https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) 新建一个。

``` sh
# 添加文件到缓冲区
git add .
# 添加到本地仓库
git commit -m "随便写点描述"
# 上传到 github
git push
```

接着，就到了最后一步：Pull Request。
