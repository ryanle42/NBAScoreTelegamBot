const TelegrafFlow = require('telegraf-flow');
const { WizardScene, Scene } = TelegrafFlow;
const { Extra, Markup } = require('telegraf');
const teamNames = require('../../teams.json');
const { teamNameFromAbbr, teamAbbrFromName } = require('../helpers/getTeamNames');
const asyncSleep = require('../helpers/asyncSleep');
const { isFollowingTeam, followTeam, getTeams } = require('../database/teams');

const followTeamScene = new WizardScene('follow-team',
  async (ctx) => {
    let teamList = [];
    output = '';
    let teams = await getTeams(ctx.from.username);
    if (teams) {
      for (team in teams) {
        let teamName = teamNameFromAbbr(team);
        if (teamName) {
          teamList.push(teamName);
        }
      }
      if (teamList) {
        teamList = teamList.join(", ");
        output += `You are following the ${teamList}.\n\n`;
      }
    }
    output += 'Please enter Team Name or ' +
    'Abbrev. eg. (GSW, Cavs, Thunders ...)';
    await ctx.reply(output, Markup.inlineKeyboard([
      Markup.callbackButton('Cancel', 'CANCEL'),
    ]).extra());
    await ctx.flow.wizard.next();
  },
  async (ctx) => {
    if (ctx.message) {
      let response = ctx.message.text;
      let params = response.split(',');
      cantRecog = [];
      following = [];
      followed = [];
      for (param in params) {
        param = params[param];
        param = param.trim();
        let teamName = teamNameFromAbbr(param);
        let teamAbbr = teamAbbrFromName(param);
        if (teamName == '') {
          cantRecog.push(param);
        } else {
          let isFollowing = await isFollowingTeam(ctx.from.username, teamAbbr);
          if (isFollowing) {
            following.push(teamName);
          } else {
            await followTeam(ctx.from.username, teamAbbr);
            followed.push(teamName);
          }
        }
      }
      cantRecog = cantRecog.join(', ');
      following = following.join(', ');
      followed = followed.join(', ');
      output = '';
      if (cantRecog) {
        output += `Can't recognize ${cantRecog}.\n`;
      }
      if (following) {
        output += `You are already following ${following}.\n`;
      }
      if (followed) {
        output += `You followed ${followed}.\n`;
      }
      await ctx.reply(output, Markup
        .keyboard([
          ['⬅️ Back', '🕓 Set Interval'],
          ['➕ Follow Team', '➖ Unfollow Team']
        ])
        .oneTime()
        .resize()
        .extra()
      );
      await ctx.flow.leave();
      ctx.flow.state = null;
    }
  }
)

module.exports = followTeamScene;
