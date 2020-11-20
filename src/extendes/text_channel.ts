import { Structures, MessageEmbed, MessageAttachment, TextChannel as DiscordTextChannel, Message } from 'discord.js';
import { Guild } from './guild';

export class TextChannel extends DiscordTextChannel {
	constructor(guild: Guild, args: Record<string, unknown>) {
		super(guild, args);
	}

	/**
	 * @param {unknown} content
	 * @param {MessageEmbed | MessageAttachment | (MessageEmbed | MessageAttachment)[]} options
	 * Sends a message, but if the content is >2000 chars then it splits it into multiple messages
	 */
	safe_send(content:unknown = '', options: (MessageEmbed | MessageAttachment | (MessageEmbed | MessageAttachment)[])=null):(Promise<Message | Message[]> | Promise<Message | Message[]>[]) {
		if(typeof content == 'string') {
			if(content.length > 2000) {
				const messages:Promise<Message | Message[]>[] = [];
				content.split(/(.|\n){0,2000}/g).forEach((element)=>messages.push(super.send(element)));
				messages.push(super.send(options));
				return messages;
			}
		}
		return super.send(content, options);
	}
}

Structures.extend('TextChannel', (..._args) => TextChannel);