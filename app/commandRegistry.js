class CommandRegistry {
  #dependencies
  #commands = new Map()

  constructor(dependencies = {}) {
    this.#dependencies = dependencies
  }

  #register(name, handler) {
    this.#commands.set(name, handler)
  }

  registerAll(commands) {
    for(const command of commands) {
      const ctx = {
        ...this.#dependencies,
        output: console.log,
        commandName: command.name,
        registry: this,
      }
      this.#register(command.name, command.factory(ctx))
    }
  }

  get(name) {
    return this.#commands.get(name)
  }

  has(name) {
    return this.#commands.has(name)
  }

  getAll() {
    return [...this.#commands.keys()]
  }
}

module.exports = CommandRegistry
