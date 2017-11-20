const { Scene } = require('telegraf-flow')
const { Extra, Markup } = require('telegraf');

const teamManagerScene = new Scene('team-manager');

teamManagerScene.enter(async (ctx) => {
  updates = false;
  await ctx.reply('Team Manager', Markup
    .keyboard([
      ['⬅️ Back', '🏀 My Teams'],
      ['➕ Follow Team', '➖ Unfollow Team']
    ])
    .oneTime()
    .resize()
    .extra()
  );
  ctx.flow.leave();
});

module.exports = teamManagerScene;
