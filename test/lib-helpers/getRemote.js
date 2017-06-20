import test from 'ava';

import getRemote from '../../lib/helpers/getRemote';

test('get remote -v not empty', async (t) => {
  const remote = await getRemote();

  t.not(remote, '');
});
