import yaml from 'js-yaml';

const parse = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);

    case 'yml':
    case 'yaml':
      return yaml.load(data);

    default:
      throw new Error('data is not valid type');
  }
};

export default parse;
