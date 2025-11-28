class SystemProcessRunner {
  #processRunner

  constructor(processRunner) {
    this.#processRunner = processRunner
  }

  run(command, args, execPath = null) {
    return this.#processRunner(command, args, {
      stdio: 'inherit',
      file: execPath,
    })
  }
}

module.exports = SystemProcessRunner
