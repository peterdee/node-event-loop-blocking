import { exec, fork, spawn } from 'child_process';

console.log('-- Block Event Loop');

let counter = 0;
let flag = false;

setTimeout(
  () => {
    flag = true;
  },
  1000,
);

// this will never be called
setTimeout(
  () => setImmediate(() => console.log('> setImmediate callback from INDEX')),
);

while (!flag) {
  counter += 1;
  if (counter % 1000000000 === 0) {
    console.log('> blocked @', counter);

    exec('node exec.js');
    fork(`${process.cwd()}/fork.js`);
    spawn('node', ['spawn.js']);
  }
}

// this will never be called
console.log('-- Event Loop is unblocked');
