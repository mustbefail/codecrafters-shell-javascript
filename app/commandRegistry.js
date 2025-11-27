class CommandRegistry {
  #dependencies = {}
  #commands = new Map()

  constructor(dependencies = {}) {
    this.#dependencies = dependencies
  }

  #register(name, handler) {
    this.#commands.set(name, handler)
  }

  registerAll(commands) {
    const ctx = {
      ...this.#dependencies,
      registry: this,
    }
    for(const command of commands) {
      if(command.factory) {
        this.#register(command.name, command.factory(ctx))
      } else {
        this.#register(command.name, command)
      }
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
