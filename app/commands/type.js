const CommandFactory = require('../CommandFactory')

const typeFactory = (ctx) => ({
  execute([command]) {
    if (!command) {
      return ctx.output('type: missing operand')
    }
    if (ctx.registry.has(command)) {
      console.log(`${command} is a shell builtin`)
    } else {
      const path = ctx.executableFinder.getCommandPath(command)
      path ? ctx.output(`${command} is ${path}`)
        : ctx.output(`${command}: not found`)
    }
  }
})

const type = new CommandFactory('type', typeFactory)

module.exports = type
