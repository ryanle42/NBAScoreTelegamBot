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
  return teamName;
}

function teamAbbrFromName(name) {
  const teamNames = require('../../teams.json');
  let teamAbbr = '';
  let teamName = '';
  for (team in teamNames) {
    if (team.toLowerCase() == name.toLowerCase() ||
      teamNames[team].toLowerCase() == name.toLowerCase()) {
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
  return teamAbbr;
}

// let teamName = teamNameFromAbbr('cavs');
// let teamAbbr = teamAbbrFromName(teamName);
// console.log(teamName);
// console.log(teamAbbr);

module.exports = {
  teamNameFromAbbr,
  teamAbbrFromName
};
