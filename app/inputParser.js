class InputParser {
  parse(input) {
    const [command, ...args] = input.trim().split(' ')
    return {command, args}
  }
}
module.exports = InputParser
