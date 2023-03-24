import genDiff from '../index.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const diff = (filepath1, filepath2, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish': {
      return stylish(genDiff(filepath1, filepath2));
    }
    case 'plain': {
      return plain(genDiff(filepath1, filepath2));
    }
    case 'json': {
      return json(genDiff(filepath1, filepath2));
    }
    default:
      throw Error(`${formatName} is not found`);
  }
};
export default diff;
