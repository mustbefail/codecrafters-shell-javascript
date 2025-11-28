const CommandFactory = require('../CommandFactory')

const echo = new CommandFactory('echo', (ctx) => ({
  execute(args) {
    ctx.output(...args)
  }
}))

module.exports = echo

