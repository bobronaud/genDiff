import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const diffJson = genDiff(getFixturePath('file1-nested.json'), getFixturePath('file2-nested.json'));
const diffYaml = genDiff(getFixturePath('file1-nested.yml'), getFixturePath('file2-nested.yml'));
const expected = readFile('genDiffResult-nested.txt');

test('nested objects', () => {
  expect(stylish(diffJson)).toEqual(expected);
  expect(stylish(diffYaml)).toEqual(expected);
});
