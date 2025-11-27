class CommandExecutor {
  #registry
  #executableFinder

  constructor(registry, executableFinder) {
    this.#registry = registry
    this.#executableFinder = executableFinder
  }

  #isCommandRegistered(command) {
    return this.#registry.has(command)
  }

  #getCommandHandler(command) {
    return this.#registry.get(command)
  }

  #getExecutablePath(command) {
    return this.#executableFinder.getCommandPath(command)
  }

  #notFoundHandler(command) {
    return console.log(`${command}: command not found`)
  }

  async execute(command, args) {
    if(this.#isCommandRegistered(command)) {
      const handler = this.#getCommandHandler(command)
      await handler.execute(args)
    } else {
      const execPath = await this.#getExecutablePath(command)
      return execPath ? this.#runExternal(execPath, args)
        : this.#notFoundHandler(command)
    }
  }

  async #runExternal(execPath, args) {
    const childProcess = require('child_process')
    childProcess.spawn(execPath, args, {stdio: 'inherit'})
  }

}
module.exports = CommandExecutor
