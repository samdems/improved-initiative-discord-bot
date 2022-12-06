import {REST, Routes } from "discord.js";
import {token,AppID} from './config.js'
console.log({token});
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },{
    name: "list",
    description: "lists Initiative"
  },{
    name:'add',
    description:"adds bot to server channel"
  }
];

const rest = new REST({ version: "10" }).setToken(
  token
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(AppID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();