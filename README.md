## Node Event Loop blocking

This example demonstrates what happens with the `child_process` methods if they are being called inside of the blocked Event Loop.

### Deploy

```shell script
git clone https://github.com/peterdee/node-event-loop-blocking
cd ./node-event-loop-blocking
```

### Launch

```shell script
npm start
```

### What happens

The `index.js` file uses the `while` loop to block the Event Loop.

To prove that it is blocked, there's a `setTimeout` and `console` statements that are never getting called.

Every 1000000000th tick of the `while` loop several of the `child_process` methods are being called to create new processes.

The results of the `exec` and `spawn` method calls are never shown, as they are launched within the same Event Loop instance, and since it is blocked, the code launched by `exec` and `spawn` is not going to be executed.

On the contrary, the result of `fork` method call is shown every time it is called, as it creates a new instance of Event Loop.

### Conclusion

`fork` method provides a separate Event Loop instance, this can be useful in some cases:

- forking a process can be useful if this process has a blocking synchronous operation;

- forking a process can be useful for the performance reasons, though there are obvious limitations due to the context switching performed by the OS.
