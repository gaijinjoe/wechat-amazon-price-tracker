const puppeteer = require("puppeteer");
const db = require("../utils/firestore.ts");
var amazonCnAsin = require("../asinArray.json");

const priceXpath = '//*[@id="priceblock_ourprice"]';
const ASINXpath =
  '//*[@id="prodDetails"]/div/div[2]/div[1]/div[2]/div/div/table/tbody/tr[1]/td[2]';
const titleXpath = '//*[@id="productTitle"]/text()';

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

module.exports = async function(bot) {
  const launchConfig = {
    headless: true,
    args: ["--no-sandbox"],
    ignoreHTTPSErrors: true
  };
  const browser = await puppeteer.launch(launchConfig);
  const page = await browser.newPage();
  for (let i in amazonCnAsin) {
    await page.goto(`https://www.amazon.cn/dp/${amazonCnAsin[i]}`, {
      waitUntil: "domcontentloaded"
    });
    // wait 2 sec
    await delay(2000);
    const pricePath = await page.$x(priceXpath);
    let date = new Date();
    let titlePath = await page.$x(titleXpath);
    let titleXpathText = await titlePath[0].getProperty("textContent");
    let titleJson = await titleXpathText.jsonValue();
    let title = titleJson.replace(/(\r\n|\n|\r)/gm, "");
    let asin = amazonCnAsin[i];
    let docRef = db.collection("prices").doc(asin);
    let previousPrice = await docRef.get().then(doc => {
      if (!doc.exists) {
        return null;
      } else {
        return doc.data().price;
      }
    });
    let price;

    if (pricePath[0] !== undefined) {
      //checking if price is there.
      let priceXpathText = await pricePath[0].getProperty("textContent");
      let priceNoRegex = await priceXpathText.jsonValue();
      price = Number(priceNoRegex.replace(/[^\d.-]/g, ""));
      console.log("this is the price ", price);
    } else {
      price = null;
      console.log("product not in stock");
    }
    let tokenObj = {
      asin,
      title,
      price,
      previousPrice,
      date
    };
    if (
      (previousPrice === null && price !== null) ||
      price < previousPrice ||
      (price === null && previousPrice !== null)
    ) {
      const YourContact = await bot.Contact.find({ id: "wxid_2w4tswtw66ft99" });
      await YourContact.say(`📟 The following product fell in price:
  -------------
  Name: ${title};

  Previous Price: ${previousPrice}

  Current Price: ${price}

  -------------
  Link: https://www.amazon.cn/dp/${asin}`);
      await docRef.set(tokenObj);
    } else if (previousPrice === null && price === null) {
      console.log(`article still out of stock`);
    } else if (price > previousPrice) {
      console.log(`article price increased`);
      const YourContact = await bot.Contact.find({ id: "wxid_2w4tswtw66ft99" });
      await YourContact.say(`📟 The following product rose in price:
  -------------
  Name: ${title};

  Previous Price: ${previousPrice}

  Current Price: ${price}

  -------------
  Link: https://www.amazon.cn/dp/${asin}`);
      await docRef.set(tokenObj);
    } else {
      console.log(
        `the price for the item ${asin} is not lower than before. Or is still out of stock`
      );
    }
  }
  await browser.close();
};
