import _ from 'lodash';
import path from 'node:path';
import parse from './parsers.js';

const buildObject = (filepath) => parse(filepath, path.extname(filepath));

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
  const firstObj = buildObject(filepath1);
  const secondObj = buildObject(filepath2);

  const iter = (obj1, obj2) => {
    const sortedAllKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
    const result = sortedAllKeys.reduce((diff, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (_.isObject(value1) && _.isObject(value2)) {
        const status = 'nested';
        const value = iter(value1, value2);
        return [...diff, { key, status, value }];
      }
      if (!Object.hasOwn(obj1, key)) {
        const status = 'added';
        const value = buildValue(value2);
        return [...diff, { key, status, value }];
      }
      if (!Object.hasOwn(obj2, key)) {
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
  return iter(firstObj, secondObj);
};

export default buildDiffTree;
