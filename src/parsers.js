import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const parse = (filepath, extname) => {
  switch (extname) {
    case '.json':
      return JSON.parse(readFileSync(path.resolve(filepath), 'utf-8'));

    case '.yml':
      return yaml.load(readFileSync(path.resolve(filepath), 'utf-8'));

    case '.yaml':
      return yaml.load(readFileSync(path.resolve(filepath), 'utf-8'));

    default:
      throw new Error('file is not valid exnatsion');
  }
};

export default parse;
