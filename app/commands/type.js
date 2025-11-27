const type = Object.freeze({
  name: 'type',
 factory: (ctx) => ({
    async execute([command]) {
      if (!command) {
        return console.log('type: missing operand')
      }
      if (ctx.registry.has(command)) {
        console.log(`${command} is a shell builtin`)
      } else {
        const path = await ctx.executableFinder.getCommandPath(command)
        path ? console.log(`${command} is ${path}`)
             : console.log(`${command}: not found`)
      }
    }
  })
})

module.exports = type
