const TelegrafFlow = require('telegraf-flow')
const { WizardScene } = TelegrafFlow;
const { Extra, Markup } = require('telegraf')
const getCurrentGames = require('../helpers/getCurrentScores');
const { isUpdatesOn, getInterval, setInterval, setTimeLeft } = require('../database/updates');
var validator = require('validator');

const setIntervalScene = new WizardScene('set-interval',
  async (ctx) => {
    let currentInterval = await getInterval(ctx.from.username);
    let message = '';
    if (currentInterval === null) {
      message = 'Interval is currently not set\n';
    } else {
      message = `Interval is currently set to ${currentInterval} minutes\n`;
    }
    console.log(message);

    message += 'Please enter the minutes for each update';
    await ctx.reply(message, Markup.inlineKeyboard([
      Markup.callbackButton('Cancel', 'CANCEL'),
    ]).extra());
    await ctx.flow.wizard.next();
  },
  async (ctx) => {
    if (ctx.message) {
      let input = ctx.message.text;
      if (validator.isInt(input, {min: 1, max: 100000})) {
        await setInterval(ctx.from.username, input);
        await setTimeLeft(ctx.from.username, 0);
        await ctx.reply(`Interval set to ${input} minutes`, Markup
          .keyboard([
            ['⬅️ Back', '🕓 Set Interval'],
            ['➕ Follow Team', '➖ Unfollow Team']
          ])
          .oneTime()
          .resize()
          .extra()
        );
      } else {
        await ctx.reply(`${input} is not a valid input`, Markup
          .keyboard([
            ['⬅️ Back', '🕓 Set Interval'],
            ['➕ Follow Team', '➖ Unfollow Team']
          ])
          .oneTime()
          .resize()
          .extra()
        );
      }
      ctx.flow.leave();
    }
  }
)

module.exports = setIntervalScene;
