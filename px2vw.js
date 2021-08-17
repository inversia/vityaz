#!/usr/bin/env node

const px = process.argv[2]
const wd = process.argv[3] || 1280

if (!px) {
    console.log ('px value is not set')
    process.exit (1)
}

function pbcopy (str) {
  const proc = require ('child_process').spawn ('pbcopy')
  proc.stdin.write (str)
  proc.stdin.end ()
}

const vw = (100 * (px / wd)).toFixed (3) + 'vw'

console.log (vw)
pbcopy (vw)
