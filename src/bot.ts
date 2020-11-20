//Get the config file and user data paths
const configPath = '../config.json';

import Discord from 'discord.js';
import * as fs from 'fs';
import { Client } from './types/types';

console.time('Start Up');

// Require the extender files before making the client
fs.readdirSync('./extenders').forEach((file) => {
	console.log(`Loading Extender ${file}`);
	if(!file.endsWith('.js')) return;
	require(`./extenders/${file}`);
});

//Create the client
const client = <Client>new Discord.Client({});

//Grab the config file and put it on the client object
client.config = require(configPath);

//Require the event files and bind them to their respective events, and send them the client object as a perameter
fs.readdirSync('./events').forEach((file) => {
	if(!file.endsWith('.js')) return;
	console.log(`Loading Event: ${file}`);
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const func = require(`./events/${file}`);
	client.on(func.name, func.run.bind(null, client));
});



//Require the command files and add them to the list of commands. We'll use these in our message event
client.commands = {};
client.aliases = {};

const load_commands = (dir: string) => {
	fs.readdirSync(dir).forEach((file) => {
		console.log(`Loading Command: ${file}`);
		let cmd;
		//Detect if the thing we found in the commands dir and if it is put all the files in that dir into the commands object if they end in .js
		if(fs.lstatSync(`${dir}/${file}`).isDirectory())
			load_commands(`${dir}/${file}`);
		else {
			if(file.endsWith('.js')) cmd = require(`./commands/${file}`);
			if(!cmd) return;
			cmd = cmd.default;
			client.commands[cmd.name] = cmd;
			for(let i = 0; i < cmd.aliases.length; i++) {
				client.aliases[cmd.aliases[i]] = cmd.name;
			}
		}
	});
};

load_commands('./commands');


console.log('Logging in');
//Login to the discord api
client.login(client.config.token).catch((err)=> console.error(err));