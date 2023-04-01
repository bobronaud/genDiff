const sings = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
  nested: '  ',
  undefined: '  ',
  // underfined is then, if node is plain and doesnt have any status
};

const replacer = ' ';
const startIndent = (depth) => replacer.repeat(4 * depth - 2);
const endIndent = (depth) => replacer.repeat(4 * depth);

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const result = node.reduce((diff, { key, status, value }) => {
      const buildValue = (val) => (Array.isArray(val) ? `{${iter(val, depth + 1)}\n${endIndent(depth)}}` : val);
      if (status === 'changed') {
        return `${diff}\n${startIndent(depth)}${sings.removed}${key}: ${buildValue(value.oldValue)}\n${startIndent(depth)}${
          sings.added
        }${key}: ${buildValue(value.newValue)}`;
      }
      return `${diff}\n${startIndent(depth)}${sings[status]}${key}: ${buildValue(value)}`;
    }, '');
    return result;
  };

  return `{${iter(tree)}\n}`;
};

export default stylish;
