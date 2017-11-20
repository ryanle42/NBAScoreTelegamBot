const TelegrafFlow = require('telegraf-flow');
const { WizardScene, Scene } = TelegrafFlow;
const { Extra, Markup } = require('telegraf');
const teamNames = require('../../teams.json');
const teamNameFromAbbr = require('../helpers/teamNameFromAbbr');
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
      await ctx.flow.enter('team-manager');
    } else {
      let infoArr = [];
      let teamList = [];
      for (team in teams) {
        let info = await getTeamInfo(team);
        let { teamName } = teamNameFromAbbr(team);
        if (teamName) {
          teamList.push(teamName);
        }
        if (info) {
          infoArr.push(info);
        }
      }
      teamList = teamList.join(", ");
      infoArr = removeDuplicates(infoArr, 'Ho');
      let output = columnify(infoArr);
      var lines = output.split('\n');
      lines.splice(0, 1);
      output = lines.join('\n');
      if (output) {
        output = `Games today for the ${teamList}.\n\n` + 
        '<code>' + output + '</code>';
        ctx.replyWithHTML(`${output}`, Markup
          .keyboard([
            ['⬅️ Back', '📊 My Teams'],
            ['➕ Follow Team', '➖ Unfollow Team']
          ])
          .oneTime()
          .resize()
          .extra()
        );
      } else {
        await ctx.reply(`No games today for the ${teamList}.`, Markup
          .keyboard([
            ['⬅️ Back', '📊 My Teams'],
            ['➕ Follow Team', '➖ Unfollow Team']
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
