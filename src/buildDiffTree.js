import _ from 'lodash';
import path from 'node:path';
import parse from './parsers.js';

const isValidExtension = (filepath) => {
  const validExtensions = ['.json', '.yaml', '.yml'];
  return validExtensions.includes(path.extname(filepath));
};

const buildValue = (buildedValue) => {
  if (!_.isObject(buildedValue)) {
    return buildedValue;
  }
  const entries = Object.entries(buildedValue);
  const result = entries.reduce((acc, [key, newValue]) => {
    const value = _.isObject(newValue) ? buildValue(newValue) : newValue;
    return [...acc, { key, value }];
  }, []);
  return result;
};

const buildDiffTree = (filepath1, filepath2) => {
  if (!isValidExtension(filepath1) || !isValidExtension(filepath2)) {
    return 'Error: file is not valid exnatsion';
  }
  const firstFile = parse(filepath1);
  const secondFile = parse(filepath2);

  const iter = (file1, file2) => {
    const sortedAllKeys = _.sortBy(_.union(_.keys(file1), _.keys(file2)));
    const result = sortedAllKeys.reduce((diff, key) => {
      const value1 = file1[key];
      const value2 = file2[key];
      if (_.isObject(value1) && _.isObject(value2)) {
        const status = 'unchanged';
        const value = iter(value1, value2);
        return [...diff, { key, status, value }];
      }
      if (!Object.hasOwn(file1, key)) {
        const status = 'added';
        const value = buildValue(value2);
        return [...diff, { key, status, value }];
      }
      if (!Object.hasOwn(file2, key)) {
        const status = 'removed';
        const value = buildValue(value1);
        return [...diff, { key, status, value }];
      }
      if (value1 !== value2) {
        const status = 'changed';
        const oldValue = buildValue(value1);
        const newValue = buildValue(value2);
        const value = { oldValue, newValue };
        return [...diff, { key, status, value }];
      }
      const status = 'unchanged';
      const value = buildValue(value1);
      return [...diff, { key, status, value }];
    }, []);
    return result;
  };
  return iter(firstFile, secondFile);
};

export default buildDiffTree;
