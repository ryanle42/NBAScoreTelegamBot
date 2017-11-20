
function teamNameFromAbbr(abbr) {
  const teamNames = require('../../teams.json');
  let teamAbbr = '';
  let teamName = '';
  for (team in teamNames) {
    if (team.toLowerCase() == abbr.toLowerCase() ||
      teamNames[team].toLowerCase() == abbr.toLowerCase()) {
        teamAbbr = teamNames[team];
        for (tmp in teamNames) {
          if (teamNames[tmp] == teamAbbr) {
            teamName = tmp;
            break;
          }
        }
      break;
    }
  }
  return { teamName, teamAbbr };
}

// function as() {

//   let { teamName, teamAbbr } = teamNameFromAbbr('cavs');
// }
// as()
module.exports = teamNameFromAbbr;
