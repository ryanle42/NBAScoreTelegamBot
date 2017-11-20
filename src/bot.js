const Telegraf = require('telegraf');
const error = require('./middleware/error');
const user = require('./middleware/user');
const firebaseSession = require('telegraf-session-firebase');
const logger = require('./middleware/logger');
const scenes = require('./middleware/scenes');
const { database } = require('./db');
const { BOT_TOKEN } = require('../config')

const bot = new Telegraf(BOT_TOKEN, {
  telegram: {
    webhookReply: true
  },
});

bot.context.user = null;
setImmediate(async () => {
  try {
    const data = await bot.telegram.getMe();
    bot.options.username = data.username;
  } catch (e) {
    console.log(e.message);
  }
});

bot.use(error);
bot.use(user);
bot.use(firebaseSession(database.ref('sessions')));
bot.use(logger);
bot.use(scenes);

bot.catch((e) => {
  console.log(e);
});

module.exports = bot;
