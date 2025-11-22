const ExecutableFinder = require('./executableFinder')

async function type(args, commandSelfName, builtins) {
  const command = args[0]
  if(!command) {
    return console.log(`type: ${commandSelfName}: missing operand`)
  }
  const pathParser = new ExecutableFinder(process.env.PATH)
  const commandPath = await pathParser.getCommandPath(command)

  if(builtins.includes(command) || commandPath) return console.log(
    `${command}${commandPath ? ` is ${commandPath}` : ` is a shell builtin` }`
  )
  else {
    return console.log(`${command}: not found`)
  }
}

module.exports.type = type
