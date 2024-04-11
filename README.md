<div align="center">
    <h1>Github buibuibui Telegram</h1> 
</div>

<!-- <div align="center">
    <a href="https://github.com/yesmore/aka.js">
    	<img src="https://img.shields.io/github/stars/yesmore/gh-buibuibui-tg.svg?logo=github" alt="star"/>
    </a>
    <a href="https://github.com/yesmore/aka.js">
    	<img src="https://img.shields.io/github/license/yesmore/gh-buibuibui-tg" alt="GPL"/>
    </a>
</div> -->

<div align="center">
  <img src="https://i.postimg.cc/3wL5dCw7/about.png">
</div>

借助 Github 的 Webhooks、Vercel's Serverless API 和 Telegram Bot，连接 Github 和 Telegram，在 Telegram chat 中接收仓库的消息。

> 效果：你给仓库 [yesmore/aka.js](https://github.com/yesmore/aka.js) 点了 star，你的 telegram 频道/群组将会收到一个包含各种元数据(可选)的点赞信息, 其他 Github 事件同理。

<table style="border:none">
<tr>
<td align='center'><img src='https://i.postimg.cc/C1zyDBZ8/deploy1.png'/></td>
<td align='center'><img src='https://i.postimg.cc/hjwk0Dx5/deploy2.png'/></td>
</tr>
</table>

> 这是部署在我的 tg 群组：[https://t.me/yesmore_cc](https://t.me/yesmore_cc)，并附带了一些机器人交互指令，发送 `/help` 查看使用说明，欢迎加入～

## 开始 Vercel 部署旅程

在这段旅程中，我们将遇到三个神秘的平台：**Github** / **Telegram** / **Vercel**，请确保你已经完成了账号的注册，故事将会以所需的[环境变量](#Vercel-Environment-variables-环境变量)为线索，引导你一步步探索。

**跟随我一起开始旅程吧！**：

**第一步，创造你的 tg 机器人并获取 `TG_TOKEN`**。打开 Telegram，寻找 [@BotFather](https://t.me/BotFather)，创造你属于自己的机器人。BotFather 是 Telegram 中机器人界的传奇人物，他可以协助你创造出小小的机器人。按照他的指导完成创造，一旦完成（即设置好机器人的昵称），BotFather 会向你发送一条信息，里面就包含了 HTTP API Token，也就是你需要的 TG_TOKEN。之后，你将通过这个机器人向 Telegram 的群组/频道发送消息。

**第二步，创建 tg 群组/频道并获取 `TG_CHAT_ID`**。`TG_CHAT_ID` 就是群组/频道的 ID。Telegram 的 ID 通常是不显式的，你可以通过 Google 搜索如何获取 ID。这里推荐一个获取 ID 的 tg bot [@username_to_id_bot](https://t.me/username_to_id_bot)，添加后向其发送你的群组/频道的唯一名称，就能拿到啦～

**第三步，生成Payload URL（即发送 Post 请求的目标 Api）**。在这一步，你有**两个选择**。你需要先了解最后两个参数的作用，即 `GH_HOOK_SECRET` 和 `PROD`。`GH_HOOK_SECRET` 用于验证请求是否来自 Github，它会在创建 Github Webhooks 和填写 Vercel 环境变量时使用。`PROD` 是 Vercel 环境变量之一，用于判断是否部署到生产环境。

两个参数是互斥的，即你可以选择**方案一**：不填写 `GH_HOOK_SECRET`，同时设置 `PROD` 为 **false**，因为非生产环境会忽略 secret 校验；或者选择**方案二**：填写 `GH_HOOK_SECRET`，设置 `PROD` 为 **true**。

**第四步，如果你选择方案一**。点击下方的【**Deploy**】按钮开始部署到 Vercel。此按钮的行为是：跳转到 Vercel 部署页面，提示你克隆本[仓库](https://github.com/yesmore/gh-buibuibui-tg)到你的 Github 账号下，输入仓库名称后（可同名，本质就是 fork 此仓库），点击 create，然后填写 Environment variables 环境变量，注意 `PROD` 设置为 **false**，点击部署。

**第五步，如果选择方案二**（若已经用方案一部署过，可以编辑修改 Vercel 环境变量即可）。根据文档 [Github Webhooks](https://docs.github.com/zh/developers/webhooks-and-events/webhooks/about-webhooks)，
`GH_HOOK_SECRET` 需要手动生成，在终端中执行 `ruby -rsecurerandom -e 'puts SecureRandom.hex(20)'`，并保存，接着同方案一操作，注意环境变量 `PROD` 设置为 **true**，并填写 `GH_HOOK_SECRET`。部署成功后，`Payload URL` 就是你的 vercel 预览地址：[https://your-github-repo-name.vercel.app/api]()，将在下一步创建 Hook 使用。

**第六步，为仓库创建 Webhook**，在你想监听的 Github 仓库中，点击 Setting，侧边栏点击 Webhooks，然后点击 add 创建，第一个参数 Payload URL 在第四/五步中获取；Content type 必须为 **application/json**；Secret 按照上述，方案一不用填，方案二填写即可；最后，下方选择中“Which events would you like to trigger this webhook?”，选择你需要监听的仓库事件，然后创建即可，第一次创建会触发一个 Ping 事件，测试是否生效。

> “愉快的代码旅程，从部署开始！”

![](https://i.postimg.cc/C5qWP3sL/hook.png)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fyesmore%2Fgh-buibuibui-tg&env=TG_TOKEN,TG_CHAT_ID,GH_HOOK_SECRET,PROD&envDescription=Environment%20variables%20needed%20to%20setup%20notifier&envLink=https%3A%2F%2Fgithub.com%2Fyesmore%2Fgh-buibuibui-tg%23environment-variables&project-name=gh-buibuibui-tg&repo-name=gh-buibuibui-tg)

### Vercel Environment variables 环境变量

| Name             | Description                                | Example                                         |
| ---------------- | ------------------------------------------ | ----------------------------------------------- |
| `TG_TOKEN`       | Telegram Bot Token                         | `0123456789:ZBX2mpx9Wjg4iqAs6izMKDXVgVV92dOA0a` |
| `TG_CHAT_ID`     | Telegram Chat ID to which updates are sent | `9876543210`                                    |
| `GH_HOOK_SECRET` | Github Hook Secret                         | `your github hook seret`                        |
| `PROD`           | Production deployment or not               | `true`                                          |


### 支持的 Handlers

> 每一个 github event 需要对应 handler 处理([event_handler](/core/event_handler.js)) => 欢迎pr

  - [x] ping
  - [x] star - stared/unstared
  - [x] push
  - [x] fork
  - [x] repository
  - [x] issues - create/close/edit
  - [x] issue_comment - create/delete/edit
  - [ ] pull_request
  - [ ] member
  - [ ] watch
  - [ ] ...

</details>

> 所有 handler 在 [event_handler.js]([/core/event_handler.js](https://github.com/yesmore/gh-buibuibui-tg/blob/main/core/event_handler.js)) 中查看

### 推送原理

git push -> touch Github webhooks then call Vercel's api (http post) -> catch event then handle it -> use Telegram's open api to send event message. 

## 参考资料

- [Github Webhooks](https://docs.github.com/zh/developers/webhooks-and-events/webhooks/about-webhooks)
- [Github Webhooks events ](https://docs.github.com/zh/developers/webhooks-and-events/webhooks/webhook-events-and-payloads)
- [Telegram Bot Api](https://core.telegram.org/api)
- [Telegram Bot API for NodeJS](https://github.com/yagop/node-telegram-bot-api)

## 感谢支持

<div><a href="https://jb.gg/OpenSourceSupport"><img  width="30%" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png"></a>

## 开源许可

gh-buibuibui-tg is open source software licensed as [GPL](/LICENSE).