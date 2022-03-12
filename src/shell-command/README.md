Shell command utility gives you the ability to work with shell while using friendly API and Flow types. Moreover, it throws exceptions when the underlying child process fails for whatever reason, so you can react easily. Basic usage:

```js
import { ShellCommand } from '@adeira/shell-command';

new ShellCommand(
  null, // optional current working directory (defaults to `process.cwd`)
  'git',
  'status',
).runSynchronously();
```

You can optionally set additional command properties:

```js
new ShellCommand(null, 'git', 'am')
  .setOutputToScreen() // prints on screen instead of returning the value
  .setStdin('input value')
  .setNoExceptions() // hides all errors - potentially dangerous!
  .runSynchronously();
```

This command currently supports only synchronous execution, and therefore it's recommended to use it only for simple scripts and tools (not for production traffic). Please note that many system commands technically support parallel execution but there can be some hidden limitations. For example Git uses single file `.git/index.lock` for locks, and you may run into issues when executing some operations in parallel:

```text
Another git process seems to be running in this repository, e.g.
an editor opened by 'git commit'. Please make sure all processes
are terminated then try again.
```
