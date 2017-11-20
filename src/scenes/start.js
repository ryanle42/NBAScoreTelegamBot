const { Scene } = require('telegraf-flow')
const { Extra, Markup } = require('telegraf');

const startScene = new Scene('start');

startScene.enter(async (ctx) => {
  let updates = false;
  let sentMsg = await ctx.reply('Menu', Markup
    .keyboard([
      ['🏀 Team Manager', '📊 Current Games'],
      (updates) ? ['🕓 Set Interval', '🔔 Updates On'] : ['🕓 Set Interval', '🔕 Updates Off']
    ])
    .oneTime()
    .resize()
    .extra()
    );
  ctx.flow.leave();
});

module.exports = startScene;
