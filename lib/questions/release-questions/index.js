"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const questions = versions => {
  const questionsList = [{
    type: 'list',
    name: 'version',
    message: 'Select semver increment or specify new version:',
    choices: versions
  }, {
    type: 'input',
    name: 'ownVersion',
    message: 'Version',
    when: answers => answers.version === versions[versions.length - 1]
  }];
  return questionsList;
};

var _default = questions;
exports.default = _default;