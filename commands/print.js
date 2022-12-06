import { SlashCommandBuilder } from 'discord.js';
import db from '../db.js'
export default {
	data: new SlashCommandBuilder()
		.setName('print')
		.setDescription('prints init'),
	async execute(interaction) {
		const print = db.cash[interaction.channel.id] || 'not added to channel'
		await interaction.reply(print);
	},
};