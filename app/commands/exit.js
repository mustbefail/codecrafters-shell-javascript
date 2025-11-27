const exitCommand = Object.freeze({
  name: 'exit',
  execute([code]) {
    process.exit(code ? parseInt(code, 10) : 0)
  }
})

module.exports = exitCommand
