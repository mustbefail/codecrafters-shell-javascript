class InputParser {
  #tokenRegex = /"([^"]*)"|'([^']*)'|(\S+)/g

  parse(input) {
    const [command, ...args] = [...input.trim().matchAll(this.#tokenRegex)]
      .map(match => match[1] ?? match[2] ?? match[3])
    return {command, args}
  }
}
module.exports = InputParser
