const cdCommand = Object.freeze({
  name: 'cd',
  execute([path]) {
    try {
      process.chdir(path)
    } catch {
      console.log(`${this.name}: ${path}: No such file or directory`)
    }
  }
})

module.exports = cdCommand
