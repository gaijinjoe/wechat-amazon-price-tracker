const fs = require("fs");
var asinProducts = require("../asinArray.json");

module.exports = async function(bot, text) {
  const keywordAdd = "/track";
  const keywordRemove = "/remove";
  const YourContact = await bot.Contact.find({ id: "wxid_4w9twwcw22ft22" });
  let asin;
  let toMod;
  let newArray = new Array();

  console.log("these are the current products ", asinProducts);
  if (text.includes(keywordAdd)) {
    asin = text.replace(keywordAdd, "");
    toMod = asinProducts;
    let productFound = false;
    for (let i in toMod) {
      if (toMod[i] === asin.replace(/\s/g, "")) {
        await YourContact.say(`The product is already being tracked`);
        productFound = true;
      }
    }
    if (productFound === false) {
      toMod.push(asin.replace(/\s/g, ""));
      await YourContact.say(`Ok, I'm adding the following ASIN: ${asin}`);
      await toMod.forEach(value => newArray.push(value));
      fs.writeFile("./asinArray.json", JSON.stringify(newArray), function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
        console.log("new asin: ", asinProducts);
      });
    }
  } else if (text.includes(keywordRemove)) {
    asin = text.replace(keywordRemove, "");
    toMod = asinProducts;
    await YourContact.say(`Ok, I'm removing the following ASIN: ${asin}`);
    for (let i in toMod) {
      if (toMod[i] === asin.replace(/\s/g, "")) {
        toMod.splice(i, 1);
        await toMod.forEach(value => newArray.push(value));
        fs.writeFile("./asinArray.json", JSON.stringify(newArray), function(
          err
        ) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        });
      }
    }
  }
};
