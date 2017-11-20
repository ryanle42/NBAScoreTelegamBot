const { database } = require('../db');

async function isUpdatesOn(username) {
  const data = await database.ref(`users/${username}/updates`).once('value');
  return (data.val() === null) ? false : true;
}

async function switchUpdates(username) {
  const data = await isUpdatesOn(username);
  let updates = (data.val() === null) ? false : true;
  await database.ref(`users/${username}/updates`).set(!updates);
}

module.exports = {
  isUpdatesOn,
  switchUpdates
};