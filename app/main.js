const readline = require('readline')
const Shell = require('./shell')
const CommandRegistry = require('./commandRegistry')
const CommandExecutor = require('./commandExecutor')
const ExecutableFinder = require('./executableFinder')
const InputParser = require('./inputParser')
const { loadCommands } = require('./commands')

// Initialize dependencies
const executableFinder = new ExecutableFinder(process.env.PATH)
const inputParser = new InputParser()

const registry = new CommandRegistry({ executableFinder })


// Register commands
const commands = loadCommands()
registry.registerAll(commands)

const executor = new CommandExecutor(registry, executableFinder)

// Create and run a shell
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '$ ',
})

const shell = new Shell(rl, inputParser, executor)

shell.start()
