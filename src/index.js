import path from 'node:path';
import formatting from './formatters/index.js';
import buildDiffTree from './buildDiffTree.js';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parse(filepath1, path.extname(filepath1));
  const file2 = parse(filepath2, path.extname(filepath2));
  const tree = buildDiffTree(file1, file2);
  return formatting(tree, formatName);
};

export default genDiff;
