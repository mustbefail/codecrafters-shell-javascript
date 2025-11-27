const type = Object.freeze({
  name: 'type',
  factory: (ctx) => ({
    execute([command]) {
      if (!command) {
        return console.log('type: missing operand')
      }
      if (ctx.registry.has(command)) {
        console.log(`${command} is a shell builtin`)
      } else {
        const path = ctx.executableFinder.getCommandPath(command)
        path ? console.log(`${command} is ${path}`)
             : console.log(`${command}: not found`)
      }
    }
  })
})

module.exports = type
