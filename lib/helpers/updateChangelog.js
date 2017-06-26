import fs from 'fs';
import gitCommitInfo from 'git-commit-info';
import moment from 'moment';
import path from 'path';

const writeToFile = (commits = [], version, exists) => {
  const cwd = process.cwd();

  let changelogData;

  if (exists) {
    const changelog = fs.readFileSync(path.join(cwd, 'CHANGELOG.md'), 'utf8');
    changelogData = `\n${changelog}`;
  } else {
    changelogData = '';
  }

  const stream = fs.createWriteStream(path.join(cwd, 'CHANGELOG.md'), 'utf8');

  stream.write(`${version} - ${moment().format('MMMM, DD YYYY')}\n\n`);

  commits.forEach((commithash) => {
    const commitInfo = gitCommitInfo({ commit: commithash, cwd });

    stream.write(`* ${commitInfo.shortHash} ${commitInfo.message.split('\n')[0]} (${commitInfo.author})\n`);
  });

  stream.write(changelogData);

  return stream.end();
};

const updateChangelog = (commits = [], version) => {
  try {
    const cwd = process.cwd();

    const exists = fs.existsSync(path.join(cwd, 'CHANGELOG.md'));

    return writeToFile(commits, version, exists);
  } catch (err) {
    return false;
  }
};

export default updateChangelog;
