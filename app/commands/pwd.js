const CommandFactory = require('../CommandFactory')

const pwd = new CommandFactory('pwd', (ctx) => ({
  execute() {
    ctx.output(process.cwd())
  }
}))

module.exports = pwd
