import recoverTasks from '../tasks/recover-tasks';
import { handler as showVersion } from '../cmds/version';

const command = 'recover';

const aliases = ['r'];

const desc = 'Recover the complete CHANGELOG.md';

/* istanbul ignore next */
const handler = (argv) => {
  if (argv.v) {
    return showVersion();
  }

  return recoverTasks(argv).run();
};

export {
  command,
  aliases,
  desc,
  handler,
};
