import { Guild as DiscordGuild, Structures } from 'discord.js';
import { Client } from '../types/types';

export class Guild extends DiscordGuild {
	
	public prefix:string[];
	public client:Client;

	constructor(client: Client, data: Record<string, unknown>) {
		super(client, data);
		this.prefix = client.config.default_prefixes;
	}
}
Structures.extend(('Guild'), (..._args) => Guild);