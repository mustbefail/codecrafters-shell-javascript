const Tokenizer = require('./tokenizer')

class Shell {
  #rl
  #executor

  constructor(rl, executor) {
    this.#rl = rl
    this.#executor = executor
  }

  start() {
    this.#rl.prompt()

    this.#rl.on('line', (input) => {
      try {
        const tokenizer = new Tokenizer(input.trim())
        const {command, args} = tokenizer.parseInputString()

        return command ? this.#executor.execute(command, args) : this.#rl.prompt()
      } catch (error) {
        console.error(`Error executing command: ${error.message}`)
      } finally {
        this.#rl.prompt()
      }
    })

    this.#rl.on('close', () => {
      console.log('\nGoodbye!')
      process.exit(0)
    })
  }
}
module.exports = Shell
