import { SlashCommandBuilder } from 'discord.js';
// import setupChrome from '../chrome.js'
import setupWs from '../ws.js'
import db from '../db.js'

export default {
	data: new SlashCommandBuilder()
		.setName('hp')
		.addIntegerOption(option =>
		option
			.setName('id')
			.setDescription('id')
			.setRequired(true))
		.addIntegerOption(option =>
		option
			.setName('amount')
			.setDescription('amount')
			.setRequired(true))
		.setDescription('sets hp'),
	async execute(interaction) {
		const channel = interaction.channel;
        const socket = db.sockets[channel.id];
        const iiId = db.iiIDs[channel.id];
		const data = db.raw[channel.id];

        const index = interaction.options.getInteger('id');
        const amount = interaction.options.getInteger('amount');
		if(!socket){
			return await interaction.reply('bot not started for this channel');
		}
		if(!data){
			return await interaction.reply('combat not started for this channel');
		}
		const id = data.Combatants[index-1]?.Id;
		console.log({index});
		if(!id){
			return await interaction.reply('combatant not found');
		}
        socket.emit("suggest damage",iiId,[id],amount,interaction.user.username)
		await interaction.reply('suggesting damage');
	},
};

// suggest damage