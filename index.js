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

    exec('node exec.js', (error, stdout, stderr) => console.log('> execed', error, stdout, stderr));

    fork(`${process.cwd()}/fork.js`);

    const spawned = spawn('node', ['spawn.js']);
    spawned.stdout.on('data', (data) => console.log('> spawned data:', data));
    spawned.on('error', (error) => console.log('> spawned error:', error));
    spawned.on('close', () => console.log('> spawned closed'));
    spawned.on('exit', (code) => console.log('> spawned exited', code));
  }
}

// this will never be called
console.log('-- Event Loop is unblocked');
