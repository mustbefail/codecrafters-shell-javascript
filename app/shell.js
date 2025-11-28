class Shell {
  #rl
  #parser
  #executor

  constructor(rl, parser, executor) {
    this.#rl = rl
    this.#parser = parser
    this.#executor = executor
  }

  start() {
    this.#rl.prompt()

    this.#rl.on('line', (input) => {
      try {
        const {command, args} = this.#parser.parse(input)
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
