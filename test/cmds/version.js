import test from 'ava';

import {
  command,
  aliases,
  desc,
} from '../../lib/cmds/version';

test('CMDS | VERSION | check command name, aliases, and desc', (t) => {
  const value = {
    command,
    aliases,
    desc,
  };
  const expected = {
    command: 'version',
    aliases: ['v'],
    desc: 'Show the current version number',
  };

  t.deepEqual(value, expected);
});
