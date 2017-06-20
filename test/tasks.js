import test from 'ava';

import tasks from '../lib/tasks';

test('check if tasks is typeof object', (t) => {
  t.is(typeof tasks(), 'object');
});
