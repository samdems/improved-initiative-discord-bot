import { SlashCommandBuilder } from 'discord.js';
import setupWs from '../ws.js'
import db from '../db.js'
import fetch from 'node-fetch';
import render from '../render.js';
export default {
	data: new SlashCommandBuilder()
		.setName('start')
		.addStringOption(option =>
		option
			.setName('id')
			.setDescription('improved-initiative Id')
			.setRequired(true))
		.setDescription('start combat on channel'),
	async execute(interaction) {
		const channel = interaction.channel;
		const iiId = interaction.options.getString('id')
		const res = await fetch('https://www.improved-initiative.com/playerviews/'+iiId);
		const json = await res.json()
		db.raw[channel.id] = json.encounterState
		db.iiIDs[channel.id] = iiId;
		db.sockets[channel.id] = await setupWs(channel,iiId);
		const msg = render(json.encounterState);
     	db.cash[channel.id] = msg;
		await interaction.reply(msg);
	},
};