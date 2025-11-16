/**
 * Map of supported shell commands.
 *
 * The object key is the command name,
 * and the value is an object describing the command's behavior.
 *
 * @type {Object.<string, { action: Function }>}
 */
const commands = {
  type: {
    action: ([command]) => commands[command] ? console.log(`${command} is a shell builtin`) : console.log(`${command}: not found`)
  },
  /**
   * Built‑in command that terminates the current process.
   *
   * @param {number[]} params
   * @param {number} params[0] Exit code for the process.
   * @returns {never}
   */
  exit: {
    action: ([code]) => process.exit(code ?? 0)
  },

  /**
   * Built‑in command that prints arguments to stdout.
   *
   * @param {string[]} args List of arguments to print.
   * @returns {void}
   */
  echo: {
    action: (args) => console.log(...args),
  },

  /**
   * Handler used when a command is not found.
   *
   * @param {unknown} _ Unused parameter (placeholder for args).
   * @param {string} command Name of the unknown command.
   * @returns {void}
   */
  notFound: {
    action: (_, command) => console.log(`${command}: command not found`)
  }
};

module.exports = { commands };
