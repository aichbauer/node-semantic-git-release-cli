import fs from 'fs';
import gitCommitInfo from 'git-commit-info';
import moment from 'moment';
import path from 'path';

const writeToFile = (commits = [], version, exists) => {
  const cwd = process.cwd();

  let changelogData;

  if (exists) {
    changelogData = fs.readFileSync(path.join(cwd, 'CHANGELOG.md'), 'utf8');
    changelogData = `\n${changelogData}`;
  } else {
    changelogData = '';
  }

  const stream = fs.createWriteStream(path.join(cwd, 'CHANGELOG.md'), 'utf8');

  stream.write(`${version} - ${moment().format('MMMM, DD YYYY')}\n\n`);

  commits.forEach((commithash) => {
    const commitInfo = gitCommitInfo({ commit: commithash, cwd });

    stream.write(`* ${commitInfo.shortHash} ${commitInfo.message} (${commitInfo.author})\n`);
  });

  stream.write(changelogData);

  return stream.end();
};

const updateChangelog = (commits = [], version) => {
  try {
    const cwd = process.cwd();

    if (fs.existsSync(path.join(cwd, 'CHANGELOG.md'))) {
      return writeToFile(commits, version, true);
    }

    return writeToFile(commits, version, false);
  } catch (err) {
    return 'could not write';
  }
};

export default updateChangelog;
