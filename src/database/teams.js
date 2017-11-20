const { database } = require('../db');

async function isFollowingTeam(username, team) {
  const data = await database.ref(`users/${username}/teams/${team}`).once('value');
  return (data.val() === null ? false : true);
}

async function followTeam(username, team) {
  await database.ref(`users/${username}/teams/${team}`).set(true);
}

async function unfollowTeam(username, team) {
  await database.ref(`users/${username}/teams/${team}`).set(null);
}

async function getTeams(username) {
  const data = await database.ref(`users/${username}/teams`).once('value');
  return (data.val());
}

module.exports = {
  isFollowingTeam,
  followTeam,
  unfollowTeam,
  getTeams
};
