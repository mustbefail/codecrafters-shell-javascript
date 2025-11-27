const fs = require('fs')
const path = require('path')

const loadCommands = () => {
  const commands = []
  const commandsDir = __dirname

  const files = fs.readdirSync(commandsDir)
    .filter(file => file.endsWith('.js') && file !== 'index.js')

  for(const file of files) {
    const command = require(path.join(commandsDir, file))
    commands.push(command)
  }
  return commands
}

module.exports = {loadCommands}
