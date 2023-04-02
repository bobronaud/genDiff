import { readFileSync } from 'node:fs';
import path from 'node:path';
import format from './formatters/index.js';
import buildDiffTree from './buildDiffTree.js';
import parse from './parsers.js';

const getFileData = (file) => readFileSync(path.resolve(file), 'utf-8');

const getFileType = (file) => path.extname(file).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(getFileData(filepath1), getFileType(filepath1));
  const data2 = parse(getFileData(filepath2), getFileType(filepath2));
  const tree = buildDiffTree(data1, data2);
  return format(tree, formatName);
};

export default genDiff;
