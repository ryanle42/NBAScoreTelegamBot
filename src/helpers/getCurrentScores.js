const urllib = require('urllib');
var columnify = require('columnify');

var date = new Date()
let year = (date.getFullYear()).toString();
let month = (date.getMonth() + 1).toString();
let day = (date.getDate()).toString();

// console.log(year + month + day);
dataSource = "https://data.nba.net/prod/v2/" + year + month + day + "/scoreboard.json";
const get_current_games = async () => {
  result = await urllib.request(dataSource);
  let data = JSON.parse(result.data);
  let games = data['games'];
  let output = [];
  games.forEach((game) => {
    gameInfo = {};
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
    gameInfo['Hom'] = home['triCode'];
    gameInfo['hs'] = home['score'];
    gameInfo['Vis'] = away['triCode'];
    gameInfo['vs'] = away['score'];
    gameInfo['Q'] = quarter ? 'Q' + quarter : 'Q0';
    gameInfo['Time'] = clock ? clock : 0;
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
module.exports = get_current_games;
