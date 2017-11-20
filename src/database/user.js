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

module.exports = {
  login,
  getChatId,
  getUsers
};
