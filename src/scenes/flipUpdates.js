const { Scene } = require('telegraf-flow')
const { Extra, Markup } = require('telegraf');
const { switchUpdates, setTimeLeft } = require('../database/updates');
const flipUpdatesScene = new Scene('flip-updates');

flipUpdatesScene.enter(async (ctx) => {
  let updates = await switchUpdates(ctx.from.username);
  await setTimeLeft(ctx.from.username, 0);
  await ctx.reply('Updates turned ' + (updates ? 'on' : 'off'), Markup
    .keyboard([
      ['🏀 My Teams', '🗓 Games Today'],
        (updates) ? ['⚙️ Settings', '🔕 Updates Off'] : ['⚙️ Settings', '🔔 Updates On']
    ])
    .oneTime()
    .resize()
    .extra()
  );
});

module.exports = flipUpdatesScene;
