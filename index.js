require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Add new commands to this list. They are registered to your server on every startup.
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong'),
].map((command) => command.toJSON());

client.once('clientReady', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Guild commands: one server only, updates instantly
  const guild = await client.guilds.fetch(process.env.GUILD_ID);
  await guild.commands.set(commands);
  console.log(`Registered ${commands.length} command(s) to ${guild.name}.`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('pong');
  }
});

client.login(process.env.DISCORD_TOKEN);