type ConfigFile = {
	token: string,
	default_prefixes: [string]
}

import { Message as DiscordMessage} from 'discord.js';
import { Guild } from '../extendes/guild';

export class Message extends DiscordMessage {
	public guild: Guild
}

export interface Command  {
    run(client: Client, message: Message, args: string[]):void;
    aliases:string[];
    name:string;
}

import { Client  as DiscordClient } from 'discord.js';

export class Client extends DiscordClient {
	public config:ConfigFile;
	public commands:{[key: string]: Command};
	public aliases:{[key: string]: string};
}