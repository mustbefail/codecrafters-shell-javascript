const echoCommand = Object.freeze({
  nama: 'echo',
  execute(args) {
    console.log(...args)
  }
})

module.exports = echoCommand

