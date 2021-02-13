console.log('> EXEC');

setImmediate(() => {
  console.log('> setImmediate callback from EXEC');
  process.exit(0);
});
