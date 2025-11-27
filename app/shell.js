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

    this.#rl.on('line', async (input) => {
      const {command, args} = this.#parser.parse(input)
      await this.#executor.execute(command, args)
      this.#rl.prompt()
    })
  }
}
module.exports = Shell
