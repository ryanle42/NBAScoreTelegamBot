function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncSleep(sec) {
  await sleep(sec * 1000);
}

module.exports = asyncSleep;