const readline = require('readline')
const { commands } = require('./commands')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '$ ',
})

rl.prompt()

rl.on('line', (input) => {
  const command = input.trim()
  if(command in commands) {
    commands[command].action()
  }
  console.log(`${input}: command not found`)
  rl.prompt()
})

