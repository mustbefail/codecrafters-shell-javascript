const { readdir, constants, access  } = require('fs/promises')

class ExecutableFinder {
  #path
  #currentOs = process.env.OS
  #pathSeparator = this.#currentOs === 'Windows_NT' ? ';' : ':'

  constructor(path) {
    this.#path = path
  }

  _parsePath() {
    return this.#path.split(this.#pathSeparator)
  }

  async _readDir(dirPath) {
      try {
        return await readdir(dirPath)
      } catch (e) {
        return null
      }
  }

  async getCommandPath(command) {
    const path = this._parsePath()
    for await (const dir of path) {
      const files = await this._readDir(dir)
      if(!files) continue

      const executable = files.find((file) => file === command)

      try {
        await access(`${dir}/${executable}`, constants.X_OK)
        return `${dir}/${executable}`
      } catch (e) {
      }
    }
  }
}

module.exports = ExecutableFinder
