class InputParser {
  // Matches and captures text in three ways:
  // 1. Text within double quotes: "([^"]*)"
  // 2. Text within single quotes: '([^']*)'
  // 3. Any non-whitespace characters: (\S+)
  #tokenRegex = /"([^"]*)"|'([^']*)'|(\S+)/g

  parse(input) {
    const tokens = [...input.trim().matchAll(this.#tokenRegex)]
      .map(match => match[1] ?? match[2] ?? match[3])

    if (tokens.length === 0) {
      return { command: '', args: [] }
    }

    const command = tokens[0]
    const args = tokens.slice(1)

    return {command, args}
  }
}
module.exports = InputParser
