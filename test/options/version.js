import test from 'ava';

import version from '../../lib/options/version';

test('OPTIONS | VERSION | check alias, describe and type', (t) => {
  const expected = {
    alias: 'v',
    describe: 'Show the current version number',
    type: 'boolean',
  };

  t.deepEqual(version, expected);
});
