const urllib = require('urllib');
var columnify = require('columnify');

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
const getCurrentGames = async () => {
  result = await urllib.request(dataSource);
  let data = JSON.parse(result.data);
  let games = data['games'];
  let output = [];
  games.forEach((game) => {
    gameInfo = {};
    var utcDate = new Date(game['startTimeUTC']);
    // utcDate.setHours(utcDate.getHours());
    var pstTime = new Date(utcDate);
    let home = game['hTeam'];
    let away = game['vTeam'];

    let quarter = game['period']['current'];
    let clock = game['clock'];
    let timeLeft = '';
    if (quarter == 4 && !clock) {
      timeLeft = 'Final';
    } else if (quarter > 0) {
      timeLeft = 'Q' + quarter + ' ' + clock;
    }
    // gameInfo['tm'] = formatAMPM(pstTime);
    gameInfo['Ho'] = home['triCode'];
    gameInfo['hs'] = home['score'];
    gameInfo['Vi'] = away['triCode'];
    gameInfo['vs'] = away['score'];
    gameInfo['Q'] = quarter ? 'Q' + quarter : formatAMPM(pstTime);
    gameInfo['Time'] = clock ? clock : null;
    output.push(gameInfo);
  });
  output = columnify(output);
  var lines = output.split('\n');
  lines.splice(0, 1);
  output = lines.join('\n');
  return (output);
}

// const as = async function() {
//   let column = await get_current_games();
//   console.log(column);
// }
// as();
module.exports = getCurrentGames;
