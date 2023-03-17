import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('nested objects', () => {
  expect(genDiff(getFixturePath('file1-nested.json'), getFixturePath('file2-nested.json'))).toEqual(readFile('genDiffResult-nesten.txt'));
  expect(genDiff(getFixturePath('file1-nested.yml'), getFixturePath('file2-nested.yml'))).toEqual(readFile('genDiffResult-nesten.txt'));
});
