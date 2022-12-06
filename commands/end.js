import { SlashCommandBuilder } from 'discord.js';
import db from '../db.js'

export default {
	data: new SlashCommandBuilder()
		.setName('end')
		.setDescription('ends combat on channel'),
	async execute(interaction) {
		const channel = interaction.channel;
		db.browsers[channel.id].close();
		await interaction.reply('leaving channel');
	},
};