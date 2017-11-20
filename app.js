const fs = require('fs');
const { NODE_ENV, PORT, BOT_TOKEN } = require('./config');
const bot = require('./src/bot');
const updater = require('./src/updater');

bot.startWebhook(`/${BOT_TOKEN}`, null, PORT);
updater();

console.log(`Server is listening to localhost:${PORT}`);

process.on('unhandledRejection', (e) => {
  console.log(e);
});

process.on('uncaughtException', (e) => {
  console.log(e);
});
