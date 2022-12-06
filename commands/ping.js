import { SlashCommandBuilder } from 'discord.js';
import db from '../db.js'
export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};