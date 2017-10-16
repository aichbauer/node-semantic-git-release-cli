import recoverTasks from '../tasks/recover-tasks';

const command = 'recover';

const aliases = ['r'];

const desc = 'Recover the complete CHANGELOG.md';

/* istanbul ignore next */
const handler = (argv) => recoverTasks(argv.b).run();

export {
  command,
  aliases,
  desc,
  handler,
};
