const { BOT_TOKEN } = require('../config');
const { getUsers } = require('./database/user');
const Telegram = require('telegraf/telegram');
const telegram = new Telegram(BOT_TOKEN);
const asyncSleep = require('./helpers/asyncSleep');
const { teamNameFromAbbr, teamAbbrFromName } = require('./helpers/getTeamNames');
const getTeamInfo = require('./helpers/getTeamInfo');
const { 
  isUpdatesOn,
  switchUpdates,
  getTimeLeft,
  setTimeLeft,
  setInterval,
  getInterval,
  setLastUpdate,
  getLastUpdate
} = require('./database/updates');
const { getTeams } = require('./database/teams');
const columnify = require('columnify');

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

const updater = async function() {
  while (true) {
    await asyncSleep(60);
    let users = await getUsers();
    for (username in users) {
      let updates = await isUpdatesOn(username);
      let id = users[username]['id'];
      if (updates) {
        let timeLeft = await getTimeLeft(username);
        let interval = await getInterval(username);
        if (timeLeft + 1 >= interval) {
          let infoArr = [];
          let teams = await getTeams(username);
          for (team in teams) {
            let info = await getTeamInfo(team);
            let teamName = teamNameFromAbbr(team);
            let teamAbbr = teamAbbrFromName(team);
            let lastUpdate = await getLastUpdate(username, teamAbbr);
            if (info  && 
            (info['hs'] > 0 || info['vs'] > 0) && 
            (info['Q'] != 'Final') && 
            ((lastUpdate == true) ||
            (info['hs'] != lastUpdate['hs'] || info['vs'] != lastUpdate['vs']))) {
              infoArr.push(info);
              await setLastUpdate(username, teamAbbr, info);
            }
          }
          infoArr = removeDuplicates(infoArr, 'Ho');
          output = columnify(infoArr, {
            showHeaders: false
          });
          if (output) {
            output = '<code>' + output + '</code>';
            await telegram.sendMessage(id, output, {parse_mode: 'HTML'});
            await setTimeLeft(username, 0);
          }
        } else {
          await setTimeLeft(username, timeLeft + 1);
        }
      }
    }
  }
}

module.exports = updater;