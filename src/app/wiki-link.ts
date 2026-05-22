import { Component, input } from '@angular/core';
import { WikiPagePipe } from './pipes';

@Component({
	selector: 'wiki-link',
	imports: [WikiPagePipe],
	template: `
		<a [href]="'https://wiki.factorio.com/' + (item() | wikiPage)">
			<img [src]="'https://wiki.factorio.com/images/' + (image | wikiPage) + '.png'" width="16">
		</a>
	`
})
export class WikiLink {
	item = input.required<string>();

	get image() {
		const item = this.item();
		return item == 'rail' ? 'straightRail' : item == 'research' ? 'lab' : item;
	}
}