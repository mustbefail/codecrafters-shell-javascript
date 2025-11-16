const readline = require('readline')
const { commands } = require('./commands')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

while (true) {
  rl.question('$ ', (answer) => {
    if(!commands.includes(answer.trim())) {
      console.log(`${answer}: command not found`)
    }
    rl.close()
  })
}
