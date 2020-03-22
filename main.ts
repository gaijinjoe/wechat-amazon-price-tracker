//export {}; //an export statement that exports nothing. fixes: [ts] Cannot redeclare block-scoped variable 'name'.

const { Wechaty } = require("wechaty");
// const {PuppetIoscat} = require('wechaty-puppet-ioscat')
const { PuppetPadplus } = require("wechaty-puppet-padplus");
const qrTerm = require("qrcode-terminal");
var schedule = require("node-schedule");
const amazon = require("./amazon/amazon.ts");
const wechatAmazonMag = require("./amazon/wechatAmazonMsg.ts");

const welcome = `
=============== Made by Gaijinjoe ===============
--------- https://github.com/gaijinjoe ---------
rack specific products on the Chinese Amazon store
and report price changes to the wechat owner 
account.
__________________________________________________
Please wait... I'm trying to login in...
`;

console.log(welcome);

//timeout function in seconds
function delaySecs(sec) {
  let time = sec * 1000;
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}
//end timeout function

const token = "secret";

const puppet = new PuppetPadplus({
  token
});

const bot = new Wechaty({
  puppet
});

bot.on("scan", onScan);
bot.on("login", onLogin);
bot.on("logout", onLogout);
bot.on("error", onError);
bot.on("message", onMessageMention);

bot.start();

async function onMessageMention(msg) {
  const contact = msg.from();
  const YourContact = await bot.Contact.find({ id: "wxid_2w4tswtw66ft99" }); //targetting your personal account

  if (contact.id === "wxid_2w4tswtw66ft99") {
    const message = msg.text();
    if (message === "ping" || message === "Ping") {
      //tests to see if the bot is up
      await YourContact.say("Pong");
    }
    await wechatAmazonMag(bot, msg.text());
  }
}

function onScan(qrcode, status) {
  qrTerm.generate(qrcode, {
    small: true
  });
}
async function onLogin(user) {
  console.log(`${user} logged in. the ID is ${user.id}`);
  await delaySecs(10);
  runAmazon;
}

async function onLogout(user) {
  bot.stop();
  console.log(`${user} logout`);
}

function onError(e) {
  console.error(e);
}

/**
 * Main bot
 */

var runAmazon = schedule.scheduleJob("0 */1 * * *", async function() {
  console.log("Amazon running");
  amazon(await bot);
}); //running every 1 hour
