import test from 'ava';

import { header, body } from '../../lib/helpers/changelogParts';


process.env.NODE_ENV = 'test';

const commits = [
  '2490544c9e6fb155440b73bab9bf6aed48ccd762',
  '2d5ae824612279e6c7e0ad9ee7acc4fbdc073442',
  '9f23f40c7c5eef9b85a7bcf41d6dc7eff149a8e0',
];

test.before('change current working directory to fixture', async () => {
  await process.chdir('test/fixtures/repo-with-tags');
});

test.after.always('reset current working directory', async () => {
  await process.chdir('../../..');
});

test('HELPERS | CHANGELOG PARTS | header', (t) => {
  const value = header('0.0.1', 'Mon October 16 17:43:49 2017 +0200');
  const expected = '0.0.1 - October, 16 2017';

  t.is(value, expected);
});


test('HELPERS | CHANGELOG PARTS | body', (t) => {
  const value = body(commits, '0.0.1');
  const expected = '* 2490544 Docs: add readme (aichbauer)\n* 2d5ae82 Test: update test (aichbauer)\n* 9f23f40 Feat: new feature fourth (aichbauer)\n\n';

  t.is(value, expected);
});
