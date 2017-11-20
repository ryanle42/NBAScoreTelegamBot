const TelegrafFlow = require('telegraf-flow');
const { WizardScene, Scene } = TelegrafFlow;
const { Extra, Markup } = require('telegraf');
const teamNames = require('../../teams.json');
const asyncSleep = require('../helpers/asyncSleep');

const followTeamScene = new WizardScene('follow-team',
  async (ctx) => {
    await ctx.reply("Please enter Team Name or " +
        "Abbrev. eg. (GSW, CLE, OKC ...)", Markup.inlineKeyboard([
      Markup.callbackButton('Cancel', 'CANCEL'),
    ]).extra());
    await ctx.flow.wizard.next();
  },
  async (ctx) => {
    if (ctx.message) {
      let response = ctx.message.text;
      let teamAbrr = '';
      let teamName = '';
      for (team in teamNames) {
        if (team.toLowerCase() == response.toLowerCase() || 
            teamNames[team].toLowerCase() == response.toLowerCase()) {
          teamAbbr = teamNames[team];
          teamName = team;
          break;
        }
      }
      if (teamName == '') {
        await ctx.reply(`Can't recognize ${response}, try again`);
        await asyncSleep(1);
        await ctx.flow.wizard.selectStep(0);
        await ctx.flow.reenter('follow-team');
      } else {
        await ctx.reply(`You are now following the ${teamName}.`);
        await asyncSleep(1);
        await ctx.flow.enter('team-manager');
      }
    }
  }
)

module.exports = followTeamScene;
