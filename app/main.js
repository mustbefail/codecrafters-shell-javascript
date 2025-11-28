const { spawnSync} = require('child_process')
const {delimiter} = require('path')

const readline = require('readline')
const Shell = require('./shell')
const CommandRegistry = require('./commandRegistry')
const CommandExecutor = require('./commandExecutor')
const ExecutableFinder = require('./executableFinder')
const InputParser = require('./inputParser')
const { loadCommands } = require('./commands')
const SystemProcessRunner = require('./systemProcessRunner')
const {InternalStrategy, SystemStrategy} = require('./executeStrategies')

// Initialize dependencies
const inputParser = new InputParser()
const executableFinder = new ExecutableFinder(process.env.PATH, delimiter)
const systemProcessRunner = new SystemProcessRunner(spawnSync)

const registry = new CommandRegistry({ executableFinder })

// Execution strategies
const internalRunnerStrategy = new InternalStrategy(registry)
const systemRunnerStrategy = new SystemStrategy(executableFinder, systemProcessRunner)

// Register commands
const commands = loadCommands()
registry.registerAll(commands)

const executor = new CommandExecutor([internalRunnerStrategy, systemRunnerStrategy])

// Create and run a shell
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '$ ',
})

const shell = new Shell(rl, inputParser, executor)

shell.start()
