#!/usr/bin/env node
import minimist from 'minimist'

import helpText from './src/_help-text.js'
import tapArc from './src/arc-tap.js'

const alias = {
  help: [ 'h', 'help' ],
  pessimistic: [ 'p', 'pessimistic', 'bail' ],
  verbose: [ 'v', 'verbose' ],
}
const options = {
  color: true,
  help: false,
  pessimistic: false,
  verbose: false,
  ...minimist(process.argv.slice(2), { alias }),
}

if (options.help) {
  console.log(helpText)
  process.exit()
}

const parser = tapArc(options, (error, result) => {
  process.exit(result.ok ? 0 : 1)
  // process.exit(result.ok && result.count > 0 ? 0 : 1)
})

process.stdin.pipe(parser)
