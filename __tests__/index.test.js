import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import diff from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const jsonFilepath1 = getFixturePath('file1-nested.json');
const jsonFilepath2 = getFixturePath('file2-nested.json');

const yamlFilepath1 = getFixturePath('file1-nested.yml');
const yamlFilepath2 = getFixturePath('file2-nested.yml');

const stylishFormatExpected = readFile('genDiffResult-nested-stylish.txt');
const plainFormatExpected = readFile('genDiffResult-nested-plain.txt');
const jsonFormatExpected = readFile('genDiffResult-nested-json.txt');

test('default stylish format', () => {
  expect(diff(jsonFilepath1, jsonFilepath2)).toEqual(stylishFormatExpected);
  expect(diff(yamlFilepath1, yamlFilepath2)).toEqual(stylishFormatExpected);
});

test('stylish format', () => {
  expect(diff(jsonFilepath1, jsonFilepath2, 'stylish')).toEqual(stylishFormatExpected);
  expect(diff(yamlFilepath1, yamlFilepath2, 'stylish')).toEqual(stylishFormatExpected);
});

test('plain format', () => {
  expect(diff(jsonFilepath1, jsonFilepath2, 'plain')).toEqual(plainFormatExpected);
  expect(diff(yamlFilepath1, yamlFilepath2, 'plain')).toEqual(plainFormatExpected);
});

test('json format', () => {
  expect(diff(jsonFilepath1, jsonFilepath2, 'json')).toEqual(jsonFormatExpected);
  expect(diff(yamlFilepath1, yamlFilepath2, 'json')).toEqual(jsonFormatExpected);
});
