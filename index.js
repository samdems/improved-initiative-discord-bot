import {token} from './config.js'

import {Client,Collection, Events,GatewayIntentBits } from "discord.js";
// import setupChrome from './chrome.js'
import fs from 'fs';
import path from 'path'
import deploy from './deploy.js';
const __dirname = path.resolve();


let msgcash = {
  value:'bot not added yet'
}
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commandList = []
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const { default: command } = await import(filePath);
	if ('data' in command && 'execute' in command) {
		commandList.push(command)
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
client.on("interactionCreate", async (interaction) => {
	const command = commandList.find(command => interaction.commandName === command.data.name)
	command?.execute(interaction)
})


client.on(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	let clientguilds = client.guilds.cache
	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} | ${guild.id}`);
		
	})
});
client.on("guildCreate", guild => {
    // What to do when the bot is invited
	deploy(guild.id);
})

client.login(token);