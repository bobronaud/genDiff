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
    return sortedAllKeys.reduce((diff, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (_.isObject(value1) && _.isObject(value2)) {
        return [...diff, { key, status: 'nested', value: iter(value1, value2) }];
      }
      if (!Object.hasOwn(obj1, key)) {
        return [...diff, { key, status: 'added', value: buildValue(value2) }];
      }
      if (!Object.hasOwn(obj2, key)) {
        return [...diff, { key, status: 'removed', value: buildValue(value1) }];
      }
      if (value1 !== value2) {
        return [
          ...diff,
          {
            key,
            status: 'changed',
            value: {
              oldValue: buildValue(value1),
              newValue: buildValue(value2),
            },
          },
        ];
      }
      return [...diff, { key, status: 'unchanged', value: buildValue(value1) }];
    }, []);
  };
  return iter(firstObj, secondObj);
};

export default buildDiffTree;
