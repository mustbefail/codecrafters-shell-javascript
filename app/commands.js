const { type } = require('./commands/type')

const commands = {
  type: {
    action: (args, command) => type(args, command, Object.keys(commands))
  },
  exit: {
    action: ([code]) => process.exit(code ?? 0)
  },
  echo: {
    action: (args) => console.log(...args),
  },
  notFound: {
    action: (_, command) => console.log(`${command}: command not found`)
  }
}


module.exports = { commands }
