const start = require('../scenes/start');
const teamManagerScene = require('../scenes/teamManager');
const currentGamesScene = require('../scenes/getCurrentGames');
const followTeamScene = require('../scenes/followTeam');
const TelegrafFlow = require('telegraf-flow');
const flow = new TelegrafFlow();


flow.command('start', async (ctx, next) => {
  await ctx.flow.enter('start');
});

flow.hears('🏀 Team Manager', ctx => ctx.flow.enter('team-manager'));
flow.hears('➕ Follow Team', ctx => ctx.flow.enter('follow-team'));
flow.hears('📊 Current Games', ctx => ctx.flow.enter('current-games'));
flow.hears('⬅️ Back', ctx => ctx.flow.enter('start'));

flow.action('CANCEL', async (ctx) => {
  await ctx.flow.leave();
  await ctx.reply('Canceled');
  await ctx.flow.enter('start');
});

flow.register(start);
flow.register(teamManagerScene);
flow.register(followTeamScene);
flow.register(currentGamesScene);

module.exports = flow.middleware();