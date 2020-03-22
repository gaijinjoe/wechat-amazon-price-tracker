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
- Open the `main.ts` file and edit the **token**. Also edit the **id** on the **YourContact** variable. You can find your WechatID by loggin into the bot. The login message on the console will provide you your ID. Open `amazon.ts` anad `wechatAmazonMsg` where you need to replace your ID as well.

- To use the bot once it's running send one of the following messages:
  - `/track ASIN_NUMBER` to track a new product.
  - `/remove ASIN_NUMBER` to remove a tracked product.

---

### Experience using Wechaty

This project was built using Wechaty and Puppeteer.
Wechaty has been straight forward to use and is very well documented. All of the code used in this open source project can be easily adapted for other purposes by looking at the Wechaty [documentation](https://github.com/wechaty/wechaty/blob/master/docs/index.md).
