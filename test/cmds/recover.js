import test from 'ava';

import {
  command,
  aliases,
  desc,
} from '../../lib/cmds/recover';

test('CMDS | RECOVER | check command name, builder, aliases, and desc', (t) => {
  const value = {
    command,
    aliases,
    desc,
  };
  const expected = {
    command: 'recover',
    aliases: ['r'],
    desc: 'Recover the complete CHANGELOG.md',
  };

  t.deepEqual(value, expected);
});
