class InternalStrategy {
  constructor(commandsRegistry) { this.registry = commandsRegistry }

  canExecute(cmd) { return this.registry.has(cmd) }

  execute(cmd, args) {
    return this.registry.get(cmd).execute(args)
  }
}

class SystemStrategy {
  constructor(finder, processRunner) {
    this.finder = finder
    this.runner = processRunner
  }

  canExecute(cmd) {
    return Boolean(this.finder.getCommandPath(cmd))
  }

  execute(cmd, args) {
    const path = this.finder.getCommandPath(cmd)
    return this.runner.run(cmd, args, path)
  }
}

module.exports = {InternalStrategy, SystemStrategy}
