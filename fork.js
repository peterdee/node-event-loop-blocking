console.log('> FORK');

setImmediate(() => {
  console.log('> setImmediate callback from FORK');
  process.exit(0);
});
