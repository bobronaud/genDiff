import _ from 'lodash';

const normalizeValue = (value) => {
  if (Array.isArray(value) || _.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return value.length === 0 ? "''" : `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (node, parent = '') => {
    const result = node.reduce((str, obj) => {
      const path = parent ? `${parent}.${obj.key}` : obj.key;
      switch (obj.status) {
        case 'added':
          return `${str}Property '${path}' was added with value: ${normalizeValue(obj.value)}\n`;

        case 'removed':
          return `${str}Property '${path}' was removed\n`;

        case 'changed':
          return `${str}Property '${path}' was updated. From ${normalizeValue(obj.oldValue)} to ${normalizeValue(obj.value)}\n`;

        case 'nested':
          return `${str}${iter(obj.children, path)}`;

        case 'unchanged':
          return str;

        default:
          throw Error(`${obj.status} is not fount`);
      }
    }, '');
    return result;
  };
  return iter(tree).trimEnd();
};

export default plain;
