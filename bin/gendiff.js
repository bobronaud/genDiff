#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    if (program.opts().format === undefined || program.opts().format === 'stylish') {
      console.log(stylish(diff));
    }
  });
program.parse();
