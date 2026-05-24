import { Component, input } from '@angular/core';
import { WikiPagePipe } from './pipes';
import { Res } from './res';

@Component({
	selector: 'wiki-link',
	imports: [WikiPagePipe],
	template: `
		<a [href]="'https://wiki.factorio.com/' + (item() | wikiPage)">
			<img [src]="'https://wiki.factorio.com/images/' + (image | wikiPage) + '.png'" width="16" style="display: block;">
		</a>
	`,
})
export class WikiLink {
	item = input.required<Res | "time">();

	get image() {
		const item = this.item();
		return overrideImage[item] ?? item;
	}
}

const overrideImage: {[R in Res | "time"]?: string} = {
	rail: 'straightRail',
	research: 'lab',
	stoneWall: 'wall',
}