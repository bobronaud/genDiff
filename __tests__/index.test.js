import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const jsonFilepath1 = getFixturePath('file1.json');
const jsonFilepath2 = getFixturePath('file2.json');

const yamlFilepath1 = getFixturePath('file1.yml');
const yamlFilepath2 = getFixturePath('file2.yml');

const stylishFormatExpected = readFile('result-stylish.txt');
const plainFormatExpected = readFile('result-plain.txt');
const jsonFormatExpected = readFile('result-json.txt');

test('default stylish format', () => {
  expect(genDiff(jsonFilepath1, jsonFilepath2)).toEqual(stylishFormatExpected);
  expect(genDiff(yamlFilepath1, yamlFilepath2)).toEqual(stylishFormatExpected);
});

test('stylish format', () => {
  expect(genDiff(jsonFilepath1, jsonFilepath2, 'stylish')).toEqual(stylishFormatExpected);
  expect(genDiff(yamlFilepath1, yamlFilepath2, 'stylish')).toEqual(stylishFormatExpected);
});

test('plain format', () => {
  expect(genDiff(jsonFilepath1, jsonFilepath2, 'plain')).toEqual(plainFormatExpected);
  expect(genDiff(yamlFilepath1, yamlFilepath2, 'plain')).toEqual(plainFormatExpected);
});

test('json format', () => {
  expect(genDiff(jsonFilepath1, jsonFilepath2, 'json')).toEqual(jsonFormatExpected);
  expect(genDiff(yamlFilepath1, yamlFilepath2, 'json')).toEqual(jsonFormatExpected);
});
