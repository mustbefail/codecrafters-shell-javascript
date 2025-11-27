const echoCommand = Object.freeze({
  name: 'echo',
  execute(args) {
    console.log(...args)
  }
})

module.exports = echoCommand

