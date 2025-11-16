const readline = require('readline')
const { commands } = require('./commands')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '$ ',
})

rl.prompt()

rl.on('line', (input) => {
  const [command, ...args] = input.trim().split(' ')
  if(command in commands) {
    commands[command].action(args, command)
  } else {
    commands['notFound'].action(args, command)
  }
  rl.prompt()
})

