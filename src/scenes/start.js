const { Scene } = require('telegraf-flow')
const { Extra, Markup } = require('telegraf');

const startScene = new Scene('start');

startScene.enter(async (ctx) => {
  let updates = false;
  ctx.session.cancel = 'start';
  let sentMsg = await ctx.reply('Menu', Markup
    .keyboard([
      ['🏀 Team Manager', '📊 Games Today'],
      (updates) ? ['🕓 Set Interval', '🔔 Updates On'] : ['🕓 Set Interval', '🔕 Updates Off']
    ])
    .oneTime()
    .resize()
    .extra()
    );
});

module.exports = startScene;
