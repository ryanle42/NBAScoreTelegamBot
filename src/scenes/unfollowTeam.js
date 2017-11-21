const TelegrafFlow = require('telegraf-flow');
const { WizardScene, Scene } = TelegrafFlow;
const { Extra, Markup } = require('telegraf');
const teamNames = require('../../teams.json');
const { teamNameFromAbbr, teamAbbrFromName } = require('../helpers/getTeamNames');
const asyncSleep = require('../helpers/asyncSleep');
const { isFollowingTeam, unfollowTeam, getTeams } = require('../database/teams');

const unfollowTeamScene = new WizardScene('unfollow-team',
  async (ctx) => {
    let teams = await getTeams(ctx.from.username);
    if (!teams) {
      await ctx.reply('You aren\'t following any teams');
      await asyncSleep(1);
      await ctx.flow.enter('team-manager');
    } else {
      let teamList = [];
      for (team in teams) {
        let teamName = teamNameFromAbbr(team);
        if (teamName) {
          teamList.push(teamName);
        }
      }
      if (teamList) {
        teamList = teamList.join(", ");
        output = `You are following the ${teamList}.\n\n`;
      }
      output = output + 'Please enter Team Name or ' +
      'Abbrev. eg. (GSW, Cavs, Thunders ...)'; 
      await ctx.reply(output, Markup.inlineKeyboard([
        Markup.callbackButton('Cancel', 'CANCEL'),
      ]).extra());
      await ctx.flow.wizard.next();
    }
  },
  async (ctx) => {
    if (ctx.message) {
      let response = ctx.message.text;
      let params = response.split(',');
      cantRecog = [];
      notFollowing = [];
      unfollowed = [];
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
            await unfollowTeam(ctx.from.username, teamAbbr);
            unfollowed.push(teamName);
          } else {
            notFollowing.push(teamName);
          } 
        }
      }
      cantRecog = cantRecog.join(', ');
      notFollowing = notFollowing.join(', ');
      unfollowed = unfollowed.join(', ');
      output = '';
      if (cantRecog) {
        output += `Can't recognize ${cantRecog}.\n`;
      }
      if (notFollowing) {
        output += `You aren't following ${notFollowing}.\n`;
      }
      if (unfollowed) {
        output += `You unfollowed ${unfollowed}.\n`;
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

module.exports = unfollowTeamScene;
