class Tokenizer {
  #input = ''
  #position = 0
  #currentToken = ''
  #state = 'NORMAL'
  #tokens = []

  constructor(string) {
    this.#input = string
  }

  parseInputString() {
    const tokens = this.tokenize()

    if (tokens.length === 0) {
      return { command: '', args: [] }
    }

    const command = tokens[0]
    const args = tokens.slice(1)

    return {command, args}
  }

  tokenize() {
    while(this.#position < this.#input.length) {
      this.#processChar(this.#input[this.#position])
      this.#position += 1
    }
    this.#flushToken()

    return this.#tokens
  }

  #processChar(char) {
    const handler = this.#stateHandlers.get(this.#state)
    if(!handler) {
      throw new Error(`Invalid state: ${this.#state}`)
    }
    handler.call(this, char)
  }


  #stateHandlers = new Map([
    ['NORMAL', (char) => {
      if(char === ' ') {
        this.#flushToken()
      } else if(char === '\'') {
        this.#state = 'SINGLE_QUOTE'
      } else if(char === '\"') {
        this.#state = 'DOUBLE_QUOTE'
      } else {
        this.#currentToken += char
      }
    }],
    ['SINGLE_QUOTE', (char) => {
      if(char === '\'') {
        this.#state = 'NORMAL'
      } else {
        this.#currentToken += char
      }
    }],
    ['DOUBLE_QUOTE', (char) => {
      if(char === '\"') {
        this.#state = 'NORMAL'
      } else if(char === '\'') {
        this.#currentToken += '\''
      } else {
        this.#currentToken += char
      }

    }]
  ])

  #flushToken() {
    if(this.#currentToken) {
      this.#tokens.push(this.#currentToken)
      this.#currentToken = ''
    }
  }

  #peekNext() {
    return this.#input[ this.#position + 1]
  }
}

module.exports = Tokenizer
