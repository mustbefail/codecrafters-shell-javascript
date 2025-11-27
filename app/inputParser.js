class InputParser {
  #tokenRegex = /"([^"]*)"|'([^']*)'|(\S+)/g

  parse(input) {
    const [command, ...args] = input.match(this.#tokenRegex)
    return {command, args}
  }
}
module.exports = InputParser
