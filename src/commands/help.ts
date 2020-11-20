import { Client, Command, Message } from '../types/types';

export default new class Help implements Command {
	run(client: Client, _message: Message, _args: string[]): void {
		const cmds = [];
		for(const cmd_name in client.commands)
			cmds.push(client.commands[cmd_name]);

		
	}
	aliases: string[] = ['h'];
	name = 'help';
};