const { Scene } = require('telegraf-flow')
const { Extra, Markup } = require('telegraf');

const teamManagerScene = new Scene('team-manager');

teamManagerScene.enter(async (ctx) => {
  updates = false;
  ctx.session.cancel = 'team-manager';
  await ctx.reply('Team Manager', Markup
    .keyboard([
      ['⬅️ Back', '📊 My Teams'],
      ['➕ Follow Team', '➖ Unfollow Team']
    ])
    .oneTime()
    .resize()
    .extra()
  );
});

module.exports = teamManagerScene;
