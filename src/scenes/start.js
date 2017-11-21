const { Scene } = require('telegraf-flow')
const { Extra, Markup } = require('telegraf');
const { isUpdatesOn } = require('../database/updates');
const { isExistingUser } = require('../database/user');
const startScene = new Scene('start');

startScene.enter(async (ctx) => {
  let updates = await isUpdatesOn(ctx.from.username);
  let existingUser = await isExistingUser(ctx.from.username);
  let message = '';
  if (existingUser) {
    message = 'Menu';
  } else {
    message = 'Hi! Thanks for using the NBA scores bot :)\n\nMobile users, ' + 
    'for optimal experience, please set the font size in your ' + 
    'settings to 13 or less.'
  }
  ctx.session.cancel = 'start';
  let sentMsg = await ctx.reply(message, Markup
    .keyboard([
      ['🏀 My Teams', '🗓 Games Today'],
      (updates) ? ['⚙️ Settings', '🔔 Updates On'] : ['⚙️ Settings', '🔕 Updates Off']
    ])
    .oneTime()
    .resize()
    .extra()
    );
});

module.exports = startScene;
