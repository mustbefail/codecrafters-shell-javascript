const fs = require('fs')
const path = require('path')

class ExecutableFinder {
  #path
  #pathSeparator = path.delimiter

  constructor(pathVariable) {
    this.#path = pathVariable
  }

  #parsePath() {
    return this.#path.split(this.#pathSeparator)
  }

  #matchesCommand(fileName, command) {
    if (process.platform === 'win32') {
      const fileNameWithoutExt = path.basename(fileName, path.extname(fileName))
      return fileNameWithoutExt.toLowerCase() === command.toLowerCase()
    }

    return fileName === command
  }

  #findExecutableInFiles(fileNames, command) {
    return fileNames.find(fileName => this.#matchesCommand(fileName, command))
  }

  #readDir(dirPath) {
    try {
      return fs.readdirSync(dirPath)
    } catch {
      return null
    }
  }

  #isAccessible(filePath) {
    try {
      fs.accessSync(filePath, fs.constants.X_OK)
      return true
    } catch {
      if (process.platform !== 'win32') {
        try {
          fs.accessSync(filePath, fs.constants.F_OK)
          return true
        } catch {
          return false
        }
      }
    }
  }

  #findInDirectory(dir, command) {
    const files = this.#readDir(dir)
    if (!files) return null

    const executable = this.#findExecutableInFiles(files, command)
    if (!executable) return null

    const fullPath = path.join(dir, executable)
    return this.#isAccessible(fullPath) ? fullPath : null
  }

  getCommandPath(command) {
    for (const dir of this.#parsePath()) {
      const result = this.#findInDirectory(dir, command)
      if (result) return result
    }
    return null
  }
}

module.exports = ExecutableFinder
