const pwdCommand = Object.freeze({
  name: 'pwd',
  execute() {
    console.log(process.cwd())
  }
})

module.exports = pwdCommand
