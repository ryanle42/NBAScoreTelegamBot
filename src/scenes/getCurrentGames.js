const TelegrafFlow = require('telegraf-flow')
const { WizardScene } = TelegrafFlow;
const { Extra, Markup } = require('telegraf')
const getCurrentGames = require('../helpers/getCurrentScores');
const { isUpdatesOn } = require('../database/updates');

const currentGamesScene = new WizardScene('current-games',
  async (ctx) => {
    let output = await getCurrentGames();
    output = '<code>' + output + '</code>';
    updates = await isUpdatesOn(ctx.from.username);
    await ctx.replyWithHTML(output, Markup
      .keyboard([
        ['🏀 Team Manager', '📊 Games Today'],
        (updates) ? ['🕓 Set Interval', '🔔 Updates On'] : ['🕓 Set Interval', '🔕 Updates Off']
      ])
      .oneTime()
      .resize()
      .extra()
    );
    ctx.flow.leave();
  }
)
module.exports = currentGamesScene;
