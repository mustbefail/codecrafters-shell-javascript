const childProcess = require('child_process')

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

  execute(command, args) {
    if(this.#isCommandRegistered(command)) {
      const handler = this.#getCommandHandler(command)
      handler.execute(args)
    } else {
      const execPath = this.#getExecutablePath(command)
      return execPath ? this.#runExternal(execPath, command, args)
        : this.#notFoundHandler(command)
    }
  }

  #runExternal(execPath, command, args) {
    const childProcess = require('child_process')
    return childProcess.spawnSync(command, args, {
      stdio: 'inherit',
      file: execPath
    })
  }

}
module.exports = CommandExecutor
