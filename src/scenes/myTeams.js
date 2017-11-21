const TelegrafFlow = require('telegraf-flow');
const { WizardScene, Scene } = TelegrafFlow;
const { Extra, Markup } = require('telegraf');
const teamNames = require('../../teams.json');
const { isUpdatesOn } = require('../database/updates');
const { teamNameFromAbbr } = require('../helpers/getTeamNames');
const asyncSleep = require('../helpers/asyncSleep');
const { getTeams } = require('../database/teams');
const getTeamInfo = require('../helpers/getTeamInfo');
var columnify = require('columnify');

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

const myTeamsScene = new WizardScene('my-teams',
  async (ctx) => {
    let teams = await getTeams(ctx.from.username);
    if (!teams) {
      await ctx.reply('You aren\'t following any teams');
      await asyncSleep(1);
      await ctx.flow.enter('start');
    } else {
      let updates = await isUpdatesOn(ctx.from.username);
      let infoArr = [];
      let teamList = [];
      for (team in teams) {
        let info = await getTeamInfo(team);
        let teamName = teamNameFromAbbr(team);
        if (info) {
          infoArr.push(info);
          teamList.push(teamName);
        }
      }
      teamList = teamList.join(", ");
      infoArr = removeDuplicates(infoArr, 'Ho');
      output = columnify(infoArr, {
        showHeaders: false
      });
      if (output) {
        output = '<code>' + output + '</code>';
        ctx.replyWithHTML(`${output}`, Markup
          .keyboard([
            ['🏀 My Teams', '🗓 Games Today'],
            (updates) ? ['⚙️ Settings', '🔕 Updates Off'] : ['⚙️ Settings', '🔔 Updates On']
          ])
          .oneTime()
          .resize()
          .extra()
        );
      } else {
        await ctx.reply(`No games today for the ${teamList}.`, Markup
          .keyboard([
            ['🏀 My Teams', '🗓 Games Today'],
            (updates) ? ['⚙️ Settings', '🔕 Updates Off'] : ['⚙️ Settings', '🔔 Updates On']
          ])
          .oneTime()
          .resize()
          .extra()
        );
      }
      await ctx.flow.leave();
      ctx.flow.state = null;
    }
  }
)

module.exports = myTeamsScene;
