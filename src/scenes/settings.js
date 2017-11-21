const { Scene } = require('telegraf-flow')
const { Extra, Markup } = require('telegraf');

const settingsScene = new Scene('settings');

settingsScene.enter(async (ctx) => {
  updates = false;
  ctx.session.cancel = 'settings';
  await ctx.reply('Settings', Markup
    .keyboard([
      ['⬅️ Back', '🕓 Set Interval'],
      ['➕ Follow Team', '➖ Unfollow Team']
    ])
    .oneTime()
    .resize()
    .extra()
  );
});

module.exports = settingsScene;
