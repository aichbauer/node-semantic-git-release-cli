import moment from 'moment';

const changelog = {
  new: `0.0.1 - ${moment().format('MMMM, DD YYYY')}\n\n
  * 2490544 Docs: add readme (aichbauer)\n
  * 2d5ae82 Test: update test (aichbauer)\n
  * 9f23f40 Feat: new feature fourth (aichbauer)\n`,
  overwritten: `0.0.1 - ${moment().format('MMMM, DD YYYY')}\n\n
  * 2490544 Docs: add readme (aichbauer)\n
  * 2d5ae82 Test: update test (aichbauer)\n
  * 9f23f40 Feat: new feature fourth (aichbauer)\n\n
  0.0.2 - ${moment().format('MMMM, DD YYYY')}\n\n
  * 2490544 Docs: add readme (aichbauer)\n
  * 2d5ae82 Test: update test (aichbauer)\n
  * 9f23f40 Feat: new feature fourth (aichbauer)\n`,
};

export default changelog;
