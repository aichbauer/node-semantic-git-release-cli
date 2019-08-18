import moment from 'moment';
import gitCommitInfo from 'git-commit-info';

const header = (version, date = '') => {
  if (date === '') {
    return `${version} - ${moment().format('MMMM, DD YYYY')}`;
  }

  return `${version} - ${moment(date, 'ddd MMM D HH:mm:ss YYYY Z').format('MMMM, DD YYYY')}`;
};

const oneCommit = (commitInfo) => (
  `* ${commitInfo.shortHash} ${commitInfo.message.split('\n')[0]} (${commitInfo.author})`
);

const body = (commits, version) => {
  const cwd = process.cwd();
  let changelogData = '';

  commits.forEach((commit, i) => {
    const commitInfo = gitCommitInfo({ commit, cwd });

    /* istanbul ignore next */
    if (!commitInfo.shortHash ||
      !commitInfo.author ||
      !commitInfo.message ||
      commitInfo.message.split('\n')[0] === version) {
      return;
    }

    changelogData = `${changelogData}${oneCommit(commitInfo)}\n`;

    if (commits.length - 1 === i) {
      changelogData = `${changelogData}\n`;
    }
  });

  return changelogData;
};

export {
  header,
  body,
};
