#!/usr/bin/env node
import { Command } from 'commander';
import pageLoader from '../src/index.js';

const program = new Command();

program
  .description('Page loader utility')
  .version('0.0.1', '-V, --version', 'output the version number')
  .argument('<url>')
  .helpOption('-h, --help', 'display help for command')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .action((url) => {
    const options = program.opts();
    pageLoader(url, options.output);
  });

program.parse();
