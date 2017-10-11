import test from 'ava';

import tasks from '../../../lib/tasks/default-tasks';

test('TASKS | DEFAULT TASKS | INDEX | check if tasks is typeof object', (t) => {
  t.is(typeof tasks(), 'object');
});
