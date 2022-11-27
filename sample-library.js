#!/usr/bin/env ts-node
const fs = require('fs')
const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('list', 'List the contents of a library.', list)
  .example('$0 list -d <path-to-library>')
  .alias('d', 'dir')
  .nargs('d', 1)
  .describe('d', 'Top-level directory of the library')
  .demandOption(['d'])
  .help('h')
  .alias('h', 'help')
  .argv

function list(yargs, helpOrVersionSet) {
  if (! helpOrVersionSet) {
    const dir = yargs.argv.dir
    walk(dir, () => console.log("I'm the list callback!"))
  }
}

function walk(dir, callback) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(err)
    } else {
      files.forEach(file => {
        console.log(`file: ${file}`)
      })
    }
  })
}

