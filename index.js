const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'REACTION'],
})

client.on('ready', () => {
  // See the "Language Support" section of this documentation
  // An empty string = ignored
  const messagesPath = ''

  // If you want to disable built in commands you can add them to this array. Simply uncomment the strings to disable that command.

  const disabledDefaultCommands = [
    // 'help',
    // 'command',
    // 'language',
    // 'prefix',
    // 'requiredrole'
  ]

  // Initialize WOKCommands with specific folders and MongoDB
  new WOKCommands(client, {
    commandsDir: 'commands',
    featuresDir: 'features',
    messagesPath,
    showWarns: true, // Show start up warnings
    del: 10, // Timeout in seconds before and error message gets deleted (Missing permissions, missing roles, or command disabled) set to -1 to disable
    disabledDefaultCommands
  })
    // Set the default prefix for your bot, it is ! by default
    .setDefaultPrefix(process.env.PREFIX)
    // Set the embed color for your bot. The default help menu will use this. This hex value can be a string too
    .setColor(process.env.COLOR)
})

client.login(process.env.TOKEN)