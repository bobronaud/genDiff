import formatting from './formatters/index.js';
import buildDiffTree from './buildDiffTree.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const tree = buildDiffTree(filepath1, filepath2);
  return formatting(tree, formatName);
};

export default genDiff;
