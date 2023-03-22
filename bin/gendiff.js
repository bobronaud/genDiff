#!/usr/bin/env node

import { Command } from 'commander';
import diff from '../src/formatters/index.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(diff(filepath1, filepath2, program.opts().format));
  });
program.parse();
