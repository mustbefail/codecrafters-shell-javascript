const { readdir, constants, access  } = require('fs/promises')

class ExecutableFinder {
  #path
  #currentOs
  #pathSeparator = this.#currentOs === 'Windows_NT' ? ';' : ':'

  constructor(path, os = process.env.OS) {
    this.#path = path
    this.#currentOs = os
  }

  #parsePath() {
    return this.#path.split(this.#pathSeparator)
  }

  async #readDir(dirPath) {
      try {
        return await readdir(dirPath)
      } catch (e) {
        return null
      }
  }

  async getCommandPath(command) {
    const path = this.#parsePath()
    for await (const dir of path) {
      const files = await this.#readDir(dir)
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
