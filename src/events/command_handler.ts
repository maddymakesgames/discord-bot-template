import { Client, Message } from '../types/types';

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
function main(client: Client, message: Message) {
	if(message.author.bot) return;


	let prefix:string;
	for(const prefox of message.guild.prefix) {
		if(message.content.startsWith(prefox)) prefix = prefox; 
	}
	if(!prefix) return;
	else {
		message.content = message.content.slice(prefix.length);
		const args = message.content.split(' ');
		
		let command = client.commands[args[0]];
		if(!command) command = client.commands[client.aliases[args[0]]];
		if(!command) return console.log(`no command: ${args}`);
		args.shift();
		command.run(client, message, args);
	}
}

module.exports = {run:main, name:'message'};