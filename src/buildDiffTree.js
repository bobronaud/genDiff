import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const sortedAllKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  return sortedAllKeys.reduce((diff, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!Object.hasOwn(obj1, key)) {
      return [...diff, { key, status: 'added', value: value2 }];
    }
    if (!Object.hasOwn(obj2, key)) {
      return [...diff, { key, status: 'removed', value: value1 }];
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return [...diff, { key, status: 'nested', children: buildDiffTree(value1, value2) }];
    }
    if (value1 !== value2) {
      return [
        ...diff,
        {
          key,
          status: 'changed',
          value: value2,
          oldValue: value1,
        },
      ];
    }
    return [...diff, { key, status: 'unchanged', value: value1 }];
  }, []);
};

export default buildDiffTree;
