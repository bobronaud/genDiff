import _ from 'lodash';

const sings = {
  nested: '  ',
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const replacer = ' ';
const startIndent = (depth) => replacer.repeat(4 * depth - 2);
const endIndent = (depth) => replacer.repeat(4 * depth);

const buildValue = (buildedValue, depth) => {
  if (!_.isObject(buildedValue)) {
    return buildedValue;
  }
  const entries = Object.entries(buildedValue);
  const result = entries.map(([key, value]) => {
    if (_.isObject(value)) {
      return `${startIndent(depth + 1)}  ${key}: ${buildValue(value, depth + 1)}`;
    }
    return `${startIndent(depth + 1)}  ${key}: ${value}`;
  });
  return `{\n${result.join('\n')}\n${endIndent(depth)}}`;
};

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const result = node.map((obj) => {
      switch (obj.status) {
        case 'nested':
          return `${startIndent(depth)}${sings[obj.status]}${obj.key}: {\n${iter(obj.children, depth + 1)}\n${endIndent(depth)}}`;
        case 'changed':
          return `${startIndent(depth)}${sings.removed}${obj.key}: ${buildValue(obj.oldValue, depth)}\n${startIndent(depth)}${sings.added}${
            obj.key
          }: ${buildValue(obj.value, depth)}`;
        case 'added':
        case 'removed':
        case 'unchanged':
          return `${startIndent(depth)}${sings[obj.status]}${obj.key}: ${buildValue(obj.value, depth)}`;
        default:
          throw new Error(`${obj.status} is not found`);
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(tree)}\n}`;
};

export default stylish;
