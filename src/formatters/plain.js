const normalizeValue = (value) => {
  if (Array.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return value.length === 0 ? "''" : `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (node, parent = '') => {
    const result = node.reduce((str, { key, status, value }) => {
      const path = parent ? `${parent}.${key}` : key;
      switch (status) {
        case 'added': {
          return `${str}Property '${path}' was added with value: ${normalizeValue(value)}\n`;
        }
        case 'removed': {
          return `${str}Property '${path}' was removed\n`;
        }
        case 'changed': {
          return `${str}Property '${path}' was updated. From ${normalizeValue(value.oldValue)} to ${normalizeValue(value.newValue)}\n`;
        }
        case 'nested': {
          return `${str}${iter(value, path)}`;
        }
        case 'unchanged': {
          return str;
        }
        default:
          throw Error(`${status} is not fount`);
      }
    }, '');
    return result;
  };
  return iter(tree).trimEnd();
};

export default plain;
