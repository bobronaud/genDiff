import _ from 'lodash';
import path from 'node:path';
import parse from './parsers.js';

const isValidExtension = (filepath) => {
  const validExtensions = ['.json', '.yaml', '.yml'];
  return validExtensions.includes(path.extname(filepath));
};

const buildValue = (value) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const result = entries.reduce((acc, [key, newValue]) => {
    const node = {};
    acc.push(node);
    node.key = key;
    node.value = _.isObject(newValue) ? buildValue(newValue) : newValue;
    return acc;
  }, []);
  return result;
};

const genDiff = (filepath1, filepath2) => {
  if (!isValidExtension(filepath1) || !isValidExtension(filepath2)) {
    return 'Error: file is not valid exnatsion';
  }
  const firstFile = parse(filepath1);
  const secondFile = parse(filepath2);

  const iter = (file1, file2) => {
    const sortedAllKeys = _.union(_.keys(file1), _.keys(file2)).sort();
    const result = sortedAllKeys.reduce((diff, key) => {
      const value1 = file1[key];
      const value2 = file2[key];
      const node = {};
      diff.push(node);
      if (_.isObject(value1) && _.isObject(value2)) {
        node.key = key;
        node.status = 'unchanged';
        node.value = iter(value1, value2);
        return diff;
      }
      if (!Object.hasOwn(file1, key)) {
        node.key = key;
        node.status = 'added';
        node.value = buildValue(value2);
        return diff;
      }
      if (!Object.hasOwn(file2, key)) {
        node.key = key;
        node.status = 'removed';
        node.value = buildValue(value1);
        return diff;
      }
      if (value1 !== value2) {
        node.key = key;
        node.status = 'changed';
        const oldValue = buildValue(value1);
        const newValue = buildValue(value2);
        node.value = { oldValue, newValue };
        return diff;
      }
      node.key = key;
      node.status = 'unchanged';
      node.value = buildValue(value1);
      return diff;
    }, []);
    return result;
  };
  return iter(firstFile, secondFile);
  // console.dir(iter(firstFile, secondFile), { depth: null });
};

export default genDiff;
