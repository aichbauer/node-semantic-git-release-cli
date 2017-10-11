import recoverTasks from '../tasks/recover-tasks';

const command = 'recover [backup] [b]';

const builder = {
  backup: {
    default: false,
  },
  b: {
    default: false,
  },
};

const aliases = ['r'];

const desc = 'Recover the complete CHANGELOG.md';

/* istanbul ignore next */
const handler = (argv) => {
  if (argv.backup || argv.b) {
    return recoverTasks(true).run();
  }

  return recoverTasks(false).run();
};

export {
  command,
  builder,
  aliases,
  desc,
  handler,
};
