const start = require('../scenes/start');
const teamManagerScene = require('../scenes/teamManager');
const myTeamsScene = require('../scenes/myTeams');
const followTeamScene = require('../scenes/followTeam');
const unfollowTeamScene = require('../scenes/unfollowTeam');
const currentGamesScene = require('../scenes/getCurrentGames');
const TelegrafFlow = require('telegraf-flow');
const flow = new TelegrafFlow();


flow.command('start', async (ctx, next) => {
  ctx.session.cancel = 'start';
  await ctx.flow.enter('start');
});

flow.hears('🏀 Team Manager', ctx => ctx.flow.enter('team-manager'));
flow.hears('📊 My Teams', ctx => ctx.flow.enter('my-teams'));
flow.hears('➕ Follow Team', ctx => ctx.flow.enter('follow-team'));
flow.hears('➖ Unfollow Team', ctx => ctx.flow.enter('unfollow-team'));
flow.hears('📊 Games Today', ctx => ctx.flow.enter('current-games'));
flow.hears('⬅️ Back', ctx => ctx.flow.enter('start'));

flow.action('CANCEL', async (ctx) => {
  await ctx.flow.leave();
  console.log(ctx.session);
  if (ctx.session.cancel == 'team-manager') {
    await ctx.flow.enter('team-manager');
  } else {
    await ctx.flow.enter('start');
  }
});

flow.register(start);
flow.register(teamManagerScene);
flow.register(myTeamsScene);
flow.register(followTeamScene);
flow.register(unfollowTeamScene);
flow.register(currentGamesScene);

module.exports = flow.middleware();