console.log('> SPAWN');

setImmediate(() => {
  console.log('> setImmediate callback from SPAWN');
  process.exit(0);
});
