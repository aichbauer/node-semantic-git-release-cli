const questions = (versions) => {
  const questionsList = [
    {
      type: 'list',
      name: 'version',
      message: 'Select semver increment or specify new version:',
      choices: versions,
    },
    {
      type: 'input',
      name: 'ownVersion',
      message: 'Version',
      when: answers => answers.version === versions[versions.length - 1],
    },
  ];

  return questionsList;
};

export default questions;
