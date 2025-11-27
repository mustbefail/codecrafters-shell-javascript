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
      const {command, args} = this.#parser.parse(input)
      this.#executor.execute(command, args)
      this.#rl.prompt()
    })
  }
}
module.exports = Shell
