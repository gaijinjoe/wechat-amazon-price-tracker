# Wechat bot tracking Amazon prices.

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)

The primary purpose of this bot is to track specific products on the Chinese Amazon store and report price changes to the owner account (can be adapted to groups or multiple contacts).

The bot is storing the last price value on Google's Firestore and comparing the saved price to the current price that's retrieved using Puppeteer every 1h.

The Chinese Amazon store has a good amount of products with huge fluctuations in price. The bot will be able to notify the owner when a product price grows or falls.

The bot can eventually be adapted to **Taobao** if there is request for it.

## How to use?

- Add the initial ASIN on the `asinArray.json` file.
- Add your **Firestore** keys in the `/utils/firestore.json` file.
- Open the `main.ts` file and edit the **token**. Also edit the **id** on the **YourContact** variable. You can find your WechatID by loggin into the bot. The login message on the console will provide you your ID. Open `amazon.ts` and `wechatAmazonMsg` where you need to replace your ID as well.

- To use the bot once it's running send one of the following messages:
  - `/track ASIN_NUMBER` to track a new product.
  - `/remove ASIN_NUMBER` to remove a tracked product.

---

### Experience using Wechaty

This project was built using Wechaty and Puppeteer.
Wechaty has been straight forward to use and is very well documented. All of the code used in this open source project can be easily adapted for other purposes by looking at the Wechaty [documentation](https://github.com/wechaty/wechaty/blob/master/docs/index.md).

---

# 优惠监控微信机器人

微信机器人跟踪亚马逊的价格， 查询最低报价。手机和电脑不用装 app 或程序插件什么的，可以直接推送到微信上。

**细节：**

1. **目的：** 该机器人的主要目的是跟踪中国亚马逊商店上的特定产品，并将价格变化报告给所有者帐户（可适应团体或多个联系人）。

2. **方案：** 该机器人将最后的价格值存储在 Google 的 Firestore 中，并将保存的价格与使用 Puppeteer 每 1 小时检索的当前价格进行比较。

3. **功能：** 中国的亚马逊商店有大量产品，价格波动很大。当产品价格上涨或下跌时，机器人可以通知所有者。

如果有要求，该机器人最终可以适应**淘宝**。

**成功案例：**

我在亚马逊 2019 黑色星期五的时候追踪到一部谷歌手机 当时的报价是 4800 元 已经是黑色星期五的优惠价格。黑五之后价格直奔 7500 元。

用了这个价格追踪机器人，我在 2020 年 3 月发现最低价格到达 3600 元最终成交。

## 如何使用？

- 在 `asinArray.json` 文件上添加初始 ASIN。
- 将您的 **Firestore** 密钥添加到 `/utils/firestore.json` 文件中。
- 打开 `main.ts` 文件并编辑 **token**. 同时在 **YourContact** 变量上编辑 **ID**。 您可以通过登录 bot 来找到您的 WechatID。控制台上的登录消息将为您提供 ID。在您还需要替换 ID 的地方打开 `amazon.ts` 和 `wechatAmazonMsg`。

- 要在漫游器运行后使用它，请发送以下消息之一：
  - `/track ASIN_NUMBER` 以跟踪新产品。
  - `/remove ASIN_NUMBER` 以删除跟踪的产品。

---

### 使用微信的经验

该项目是使用 Wechaty 和 Puppeteer 构建的。 Wechaty 一直很容易使用，并且有据可查。通过查看 Wechaty[文档](https://github.com/wechaty/wechaty/blob/master/docs/index.md)，可以轻松地将此开源项目中使用的所有代码修改为其他目的。
