const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const result = node.reduce((diff, { key, status, value }) => {
      switch (status) {
        case 'added': {
          diff = Array.isArray(value)
            ? (diff = `${diff}\n${' '.repeat(4 * depth - 2)}+ ${key}: {${iter(value, depth + 1)}\n${' '.repeat(4 * depth)}}`)
            : `${diff}\n${' '.repeat(4 * depth - 2)}+ ${key}: ${value}`;
          return diff;
        }
        case 'removed': {
          diff = Array.isArray(value)
            ? (diff = `${diff}\n${' '.repeat(4 * depth - 2)}- ${key}: {${iter(value, depth + 1)}\n${' '.repeat(4 * depth)}}`)
            : `${diff}\n${' '.repeat(4 * depth - 2)}- ${key}: ${value}`;
          return diff;
        }
        case 'changed': {
          diff = Array.isArray(value.oldValue)
            ? (diff = `${diff}\n${' '.repeat(4 * depth - 2)}- ${key}: {${iter(value.oldValue, depth + 1)}\n${' '.repeat(4 * depth)}}`)
            : `${diff}\n${' '.repeat(4 * depth - 2)}- ${key}: ${value.oldValue}`;
          diff = Array.isArray(value.newValue)
            ? (diff = `${diff}\n${' '.repeat(4 * depth - 2)}+ ${key}: {${iter(value.newValue, depth + 1)}\n${' '.repeat(4 * depth)}}`)
            : `${diff}\n${' '.repeat(4 * depth - 2)}+ ${key}: ${value.newValue}`;
          return diff;
        }
        default: {
          diff = Array.isArray(value)
            ? (diff = `${diff}\n${' '.repeat(4 * depth)}${key}: {${iter(value, depth + 1)}\n${' '.repeat(4 * depth)}}`)
            : `${diff}\n${' '.repeat(4 * depth)}${key}: ${value}`;
          return diff;
        }
      }
    }, '');
    return result;
  };

  return `{${iter(tree)}\n}`;
};

export default stylish;
