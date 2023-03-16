import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  if (path.extname(filepath) === '.yml' || path.extname(filepath) === '.yaml') {
    return yaml.load(readFileSync(path.resolve(filepath), 'utf-8'));
  }
  return JSON.parse(readFileSync(path.resolve(filepath), 'utf-8'));
};

export default parse;
