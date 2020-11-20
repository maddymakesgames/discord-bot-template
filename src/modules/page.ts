export default class Page {

	private pages: [unknown, unknown][] = [];
	private items_per_page: number;
	private current_page: number;
	private number_of_pages: number;

	constructor(data: Record<string, unknown>, items_per_page: number) {
		this.current_page = 0;
		this.items_per_page = items_per_page;
		this.number_of_pages = Object.keys(data).length / this.items_per_page;

		for(const key in data) {
			this.pages.push([key, data[key]]);
		}
	}

	get_current_page(): [unknown, unknown][] {
		return this.pages.slice(this.current_page * this.items_per_page, (this.current_page + 1) * this.items_per_page);
	}

	next_page(): void {
		if(this.current_page < this.number_of_pages)
			this.current_page++;
	}

	previous_page(): void {
		if(this.current_page > 0)
			this.current_page--;
	}
}