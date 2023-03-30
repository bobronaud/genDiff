const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const result = node.reduce((diff, { key, status, value }) => {
      switch (status) {
        case 'added':
          return Array.isArray(value)
            ? `${diff}\n${' '.repeat(4 * depth - 2)}+ ${key}: {${iter(value, depth + 1)}\n${' '.repeat(4 * depth)}}`
            : `${diff}\n${' '.repeat(4 * depth - 2)}+ ${key}: ${value}`;
        case 'removed':
          return Array.isArray(value)
            ? `${diff}\n${' '.repeat(4 * depth - 2)}- ${key}: {${iter(value, depth + 1)}\n${' '.repeat(4 * depth)}}`
            : `${diff}\n${' '.repeat(4 * depth - 2)}- ${key}: ${value}`;
        case 'changed': {
          const newDiff = Array.isArray(value.oldValue)
            ? `${diff}\n${' '.repeat(4 * depth - 2)}- ${key}: {${iter(value.oldValue, depth + 1)}\n${' '.repeat(4 * depth)}}`
            : `${diff}\n${' '.repeat(4 * depth - 2)}- ${key}: ${value.oldValue}`;
          return Array.isArray(value.newValue)
            ? `${newDiff}\n${' '.repeat(4 * depth - 2)}+ ${key}: {${iter(value.newValue, depth + 1)}\n${' '.repeat(4 * depth)}}`
            : `${newDiff}\n${' '.repeat(4 * depth - 2)}+ ${key}: ${value.newValue}`;
        }
        default:
          return Array.isArray(value)
            ? `${diff}\n${' '.repeat(4 * depth)}${key}: {${iter(value, depth + 1)}\n${' '.repeat(4 * depth)}}`
            : `${diff}\n${' '.repeat(4 * depth)}${key}: ${value}`;
      }
    }, '');
    return result;
  };

  return `{${iter(tree)}\n}`;
};

export default stylish;
