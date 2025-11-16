const readline = require('readline')
const { commands } = require('./commands')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '$ ',
})

rl.prompt()

rl.on('line', (input) => {
  if(!commands.includes(input)) {
    console.log(`${input}: command not found`)
  }
  rl.prompt()
})

