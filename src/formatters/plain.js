const normalizeValue = (value) => {
  let newValue = value;
  if (Array.isArray(value)) {
    newValue = '[complex value]';
  }
  if (typeof value === 'string') {
    newValue = value.length === 0 ? "''" : `'${value}'`;
  }
  return newValue;
};

const plain = (tree) => {
  const iter = (node, parent = '') => {
    const result = node.reduce((str, { key, status, value }) => {
      const path = parent ? `${parent}.${key}` : key;
      switch (status) {
        case 'added': {
          str = `${str}Property '${path}' was added with value: ${normalizeValue(value)}\n`;
          break;
        }
        case 'removed': {
          str = `${str}Property '${path}' was removed\n`;
          break;
        }
        case 'changed': {
          str = `${str}Property '${path}' was updated. From ${normalizeValue(value.oldValue)} to ${normalizeValue(value.newValue)}\n`;
          break;
        }
        case 'unchanged': {
          str = Array.isArray(value) ? `${str}${iter(value, path)}` : str;
          break;
        }
        default:
          throw Error(`${status} is not fount`);
      }
      return str;
    }, '');
    return result;
  };
  return iter(tree).trimEnd();
};

export default plain;
