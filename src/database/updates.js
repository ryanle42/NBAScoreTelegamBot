const { database } = require('../db');

async function isUpdatesOn(username) {
  const data = await database.ref(`users/${username}/updates`).once('value');
  return (data.val() === null) ? false : data.val();
}

async function switchUpdates(username) {
  const updates = await isUpdatesOn(username);
  await database.ref(`users/${username}/updates`).set(!updates);
  return (!updates);
}

async function getTimeLeft(username) {
  let data = await database.ref(`users/${username}/timeLeft`).once('value');
  return (data.val() === null) ? 0 : data.val();
}

async function setTimeLeft(username, min) {
  await database.ref(`users/${username}/timeLeft`).set(min);
}

async function setInterval(username, min) {
  await database.ref(`users/${username}/interval`).set(min);
}

async function getInterval(username) {
  let data = await database.ref(`users/${username}/interval`).once('value');
  return (data.val() === null) ? null : data.val();
}

module.exports = {
  isUpdatesOn,
  switchUpdates,
  getTimeLeft,
  setTimeLeft,
  setInterval,
  getInterval
};