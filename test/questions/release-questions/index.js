import test from 'ava';

import generateVersions from '../../../lib/helpers/generateVersions';
import questions from '../../../lib/questions/release-questions';

test('QUESTIONS | DEFAULT QUESTIONS | check the values of questions object', (t) => {
  const versions = generateVersions('0.0.1');
  const questionsList = questions(versions);

  t.is(typeof questionsList, 'object');
});

test('QUESTIONS | DEFAULT QUESTIONS | check if the second question is not shown with a version number', (t) => {
  const versions = generateVersions('0.0.1');
  const questionsList = questions(versions);

  t.is(questionsList[1].when({ version: '0.0.2' }), false);
});

test('QUESTIONS | DEFAULT QUESTIONS | check if the second question is shown with a Other (specify)', (t) => {
  const versions = generateVersions('0.0.1');
  const questionsList = questions(versions);

  t.is(questionsList[1].when({ version: 'Other (specify)' }), true);
});
