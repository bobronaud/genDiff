import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatting = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree);

    case 'plain':
      return plain(tree);

    case 'json':
      return json(tree);

    default:
      throw Error(`${formatName} is not found`);
  }
};
export default formatting;
