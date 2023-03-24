import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const diffJson = genDiff(getFixturePath('file1-nested.json'), getFixturePath('file2-nested.json'));
const diffYaml = genDiff(getFixturePath('file1-nested.yml'), getFixturePath('file2-nested.yml'));
const stylishFormatExpected = readFile('genDiffResult-nested-stylish.txt');
const plainFormatExpected = readFile('genDiffResult-nested-plain.txt');
const jsonFormatExpected = readFile('genDiffResult-nested-json.txt');

test('stylish format', () => {
  expect(stylish(diffJson)).toEqual(stylishFormatExpected);
  expect(stylish(diffYaml)).toEqual(stylishFormatExpected);
});

test('plain format', () => {
  expect(plain(diffJson)).toEqual(plainFormatExpected);
  expect(plain(diffYaml)).toEqual(plainFormatExpected);
});

test('json format', () => {
  expect(json(diffJson)).toEqual(jsonFormatExpected);
  expect(json(diffYaml)).toEqual(jsonFormatExpected);
});
