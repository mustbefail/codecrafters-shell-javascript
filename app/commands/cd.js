const CommandFactory = require('../CommandFactory')
const cdFactory = (ctx) => ({execute([path]) {
    const { chdir } = require('node:process')
    const dirPath = path === '~' ? process.env.HOME : path
    try {
      chdir(dirPath)
    } catch {
      ctx.output(`${ctx.commandName}: ${dirPath}: No such file or directory`)
    }
  }
})

const cd = new CommandFactory('cd', cdFactory)

module.exports = cd
