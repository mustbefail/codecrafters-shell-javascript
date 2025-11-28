class CommandExecutor {
  #strategies = []

  constructor(executeStrategies) {
    this.#strategies = executeStrategies
  }

  execute(command, args) {
    const executeStrategy = this.#strategies.find((s) => s.canExecute(command))
    return executeStrategy ? executeStrategy.execute(command, args) : this.#notFoundHandler(command)
  }

  #notFoundHandler(command) {
    return console.log(`${command}: command not found`)
  }

}

module.exports = CommandExecutor


