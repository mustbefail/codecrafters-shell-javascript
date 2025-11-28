class CommandFactory {
  constructor(commandName, commandFactory) {
    return Object.freeze({
      name: commandName,
      factory: commandFactory
    })
  }
}

module.exports = CommandFactory
