const { BOT_TOKEN } = require('../config');
const { getUsers } = require('./database/user');
const Telegram = require('telegraf/telegram');
const telegram = new Telegram(BOT_TOKEN);
const asyncSleep = require('./helpers/asyncSleep');

const updater = async function() {
  while (true) {
    await asyncSleep(60);
    console.log('asdf');
  }
  // let users = await getUsers();
  // for (username in users) {
  //   let id = users[username]['id'];
  //   telegram.sendMessage(id, 'hi');
  // }
}

module.exports = updater;