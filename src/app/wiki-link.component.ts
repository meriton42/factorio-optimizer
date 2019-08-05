import { Component, Input } from '@angular/core';

@Component({
	selector: 'wiki-link',
	template: `
		<a [href]="'https://stable.wiki.factorio.com/' + (item | wikiPage)">
			<img [src]="'https://stable.wiki.factorio.com/images/' + (item | wikiPage) + '.png'" width="16">
		</a>
	`
})
export class WikiLinkComponent {
	@Input()
	item: string;
}