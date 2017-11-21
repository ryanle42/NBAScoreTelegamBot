const start = require('../scenes/start');
const settingsScene = require('../scenes/settings');
const myTeamsScene = require('../scenes/myTeams');
const followTeamScene = require('../scenes/followTeam');
const unfollowTeamScene = require('../scenes/unfollowTeam');
const currentGamesScene = require('../scenes/getCurrentGames');
const flipUpdatesScene = require('../scenes/flipUpdates');
const setIntervalScene = require('../scenes/setInterval');
const TelegrafFlow = require('telegraf-flow');
const flow = new TelegrafFlow();


flow.command('start', async (ctx, next) => {
  ctx.session.cancel = 'start';
  await ctx.flow.enter('start');
});

flow.hears('⚙️ Settings', ctx => ctx.flow.enter('settings'));
flow.hears('🏀 My Teams', ctx => ctx.flow.enter('my-teams'));
flow.hears('🔔 Updates On', ctx => ctx.flow.enter('flip-updates'));
flow.hears('🔕 Updates Off', ctx => ctx.flow.enter('flip-updates'));
flow.hears('🕓 Set Interval', ctx => ctx.flow.enter('set-interval'));
flow.hears('➕ Follow Team', ctx => ctx.flow.enter('follow-team'));
flow.hears('➖ Unfollow Team', ctx => ctx.flow.enter('unfollow-team'));
flow.hears('🗓 Games Today', ctx => ctx.flow.enter('current-games'));
flow.hears('⬅️ Back', ctx => ctx.flow.enter('start'));

flow.action('CANCEL', async (ctx) => {
  await ctx.flow.leave();
  if (ctx.session.cancel == 'settings') {
    await ctx.flow.enter('settings');
  } else {
    await ctx.flow.enter('start');
  }
});

flow.register(start);
flow.register(setIntervalScene);
flow.register(flipUpdatesScene);
flow.register(settingsScene);
flow.register(myTeamsScene);
flow.register(followTeamScene);
flow.register(unfollowTeamScene);
flow.register(currentGamesScene);

module.exports = flow.middleware();