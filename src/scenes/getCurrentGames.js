const TelegrafFlow = require('telegraf-flow')
const { WizardScene } = TelegrafFlow;
const { Extra, Markup } = require('telegraf')
const getCurrentGames = require('../helpers/getCurrentScores');
const { isUpdatesOn } = require('../database/updates');

const currentGamesScene = new WizardScene('current-games',
  async (ctx) => {
    let output = await getCurrentGames();
    output = '<code>' + output + '</code>';
    let updates = await isUpdatesOn(ctx.from.username);
    await ctx.replyWithHTML(output, Markup
      .keyboard([
        ['🏀 My Teams', '🗓 Games Today'],
        (updates) ? ['⚙️ Settings', '🔔 Updates On'] : ['⚙️ Settings', '🔕 Updates Off']
      ])
      .oneTime()
      .resize()
      .extra()
    );
    ctx.flow.leave();
  }
)
module.exports = currentGamesScene;
