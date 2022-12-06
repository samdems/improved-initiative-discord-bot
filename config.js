import * as dotenv from 'dotenv'
dotenv.config();

export const clientId = process.env['DISCORD_APPID'] 
export const token = process.env['DISCORD_TOKEN']

