const { database } = require('../db');

async function login(ctx) {
  await database.ref(`users/${ctx.from.username}/id`).set(ctx.chat.id);
}

async function getChatId(username) {
  const data = await database.ref(`users/${username}/id`).once('value');
  return (data.val()); 
}

async function getUsers() {
  const data = await database.ref(`users`).once('value');
  return (data.val());
}

async function isExistingUser(username) {
  const data = await database.ref(`users/${username}/existingUser`).once('value');
  let exists = (data.val() === null) ? false : data.val();
  if (!exists) {
    await database.ref(`users/${username}/existingUser`).set(true);
    return false;
  } else {
    return true;
  }
}

module.exports = {
  login,
  getChatId,
  getUsers,
  isExistingUser
};
