import _ from 'lodash';
import path from 'node:path';
import parse from './parsers.js';

const isValidExtension = (filepath) => {
  const validExtensions = ['.json', '.yaml', '.yml'];
  return validExtensions.includes(path.extname(filepath));
};

const genDiff = (filepath1, filepath2) => {
  if (!isValidExtension(filepath1) || !isValidExtension(filepath2)) {
    return 'Error: file is not valid exnatsion';
  }
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const sortedAllKeys = _.union(_.keys(file1), _.keys(file2)).sort();
  const result = sortedAllKeys.reduce((diff, key) => {
    if (!Object.hasOwn(file1, key)) {
      diff = `${diff}\n  + ${key}: ${file2[key]}`;
      return diff;
    }
    if (!Object.hasOwn(file2, key)) {
      diff = `${diff}\n  - ${key}: ${file1[key]}`;
      return diff;
    }
    if (file1[key] !== file2[key]) {
      diff = `${diff}\n  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
      return diff;
    }
    diff = `${diff}\n    ${key}: ${file1[key]}`;
    return diff;
  }, '');
  return `{${result}\n}`;
};

export default genDiff;
