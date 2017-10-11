import moment from 'moment';

const changelog = {
  new: `0.0.1 - ${moment().format('MMMM, DD YYYY')}

* 2490544 Docs: add readme (aichbauer)
* 2d5ae82 Test: update test (aichbauer)
`,
  overwritten: `0.0.2 - ${moment().format('MMMM, DD YYYY')}

* 2490544 Docs: add readme (aichbauer)
* 2d5ae82 Test: update test (aichbauer)
0.0.1 - ${moment().format('MMMM, DD YYYY')}

* 2490544 Docs: add readme (aichbauer)
* 2d5ae82 Test: update test (aichbauer)
`,
  noCommitsAndVersion: `undefined - ${moment().format('MMMM, DD YYYY')}\n\n`,
};

export default changelog;
