import test from 'ava';

import {
  command,
  builder,
  aliases,
  desc,
} from '../../lib/cmds/recover';

test('CMDS | RECOVER | check command name, builder, aliases, and desc', (t) => {
  const value = {
    command,
    builder,
    aliases,
    desc,
  };
  const expected = {
    command: 'recover [backup]',
    builder: {
      backup: {
        default: false,
      },
    },
    aliases: ['r'],
    desc: 'Recover the complete CHANGELOG.md',
  };

  t.deepEqual(value, expected);
});
