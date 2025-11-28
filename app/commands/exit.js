const CommandFactory = require('../CommandFactory')

const exit = new CommandFactory('exit', (ctx) => ({
  execute([code]) {
    process.exit(code ? parseInt(code, 10) : 0)
  }
}))

module.exports = exit
