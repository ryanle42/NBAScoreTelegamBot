const urllib = require('urllib');
const { teamNameFromAbbr, teamAbbrFromName } = require('../helpers/getTeamNames');

var date = new Date()
let year = (date.getFullYear()).toString();
let month = (date.getMonth() + 1).toString();
let day = (date.getDate()).toString();

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

// console.log(year + month + day);
dataSource = "https://data.nba.net/prod/v2/" + year + month + day + "/scoreboard.json";
const getTeamInfo = async (teamAbbr) => {
  result = await urllib.request(dataSource);
  let data = JSON.parse(result.data);
  let games = data['games'];
  let output = null;
  games.forEach((game) => {
    let = gameInfo = {};
    var utcDate = new Date(game['startTimeUTC']);
    var pstTime = new Date(utcDate);
    let home = game['hTeam'];
    let away = game['vTeam'];
    if (home['triCode'] == teamAbbr || away['triCode'] == teamAbbr) {
      let quarter = game['period']['current'];
      let clock = game['clock'];
      let timeLeft = '';
      if (quarter >= 4 && !clock) {
        timeLeft = 'Final';
      } else if (quarter == 2 && !clock) {
        timeLeft = 'Halftime';
      } else if (quarter > 0) {
        timeLeft = 'Q' + quarter + ' ' + clock;
      }
      gameInfo['Ho'] = teamNameFromAbbr(home['triCode']);
      gameInfo['hs'] = home['score'];
      gameInfo['Vi'] = teamNameFromAbbr(away['triCode']);
      gameInfo['vs'] = away['score'];
      gameInfo['Q'] = quarter ? timeLeft: formatAMPM(pstTime);
      output = gameInfo;
    }
  });
  return output;
}
// const as = async function() {
//   let column = await getTeamInfo('CLE');
//   console.log(column);
// }
// as();

module.exports = getTeamInfo;
