import { MessageEmbed, MessageReaction, User } from 'discord.js';
import { EventEmitter } from 'events';
import { Message } from '../types/types';
import Page from './page';

export default class PageEmbed extends EventEmitter{
	private page: Page;
	private message: Message;
	private user: string;
	private next_page_emotes: string[] = ['⬅','➡'];
	private options_emotes: string[] = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣','7⃣', '8⃣', '9⃣', '🔟',];
	private options: PageEmbedOptions;
	
	constructor(message: Message, data: Record<string, unknown>, items_per_page = 8, options: PageEmbedOptions) {
		super();

		this.options = options;

		this.page = new Page(data, items_per_page);
		this.user = message.author.id;

		this.start(message).then(()=>{});
	}

	async start(message: Message) {
		this.message = <Message>await message.channel.send(this.build_embed());

		const collector = message.createReactionCollector(this.collector_filter);
		collector.on('collect', this.on_react);
	}

	build_embed(): MessageEmbed {
		
		const data = this.page.get_current_page().map(ele => {return {name: ele[0], value: ele[1]};});
		
		return new MessageEmbed().setColor('FF0000').addFields(data);
	}

	on_react(reaction: MessageReaction, user: User) {
		switch(reaction.emoji.name) {
			case '➡':
				this.page.next_page();
				this.emit('page_change', 1);
				break;

			case '⬅':
				this.page.previous_page();
				this.emit('page_change', -1);
				break;

			default:
				this.emit('select', reaction, user, this.options_emotes.indexOf(reaction.emoji.name));
		}

		this.message.edit(this.build_embed());
	}

	private collector_filter(reaction: MessageReaction, user: User): boolean {
		return (this.next_page_emotes.includes(reaction.emoji.name) || (this.options.has_options && this.options_emotes.includes(reaction.emoji.name))) && user.id == this.user;
	}

}

export type PageEmbedOptions = {
	has_options: boolean,
	items_per_page: number
}