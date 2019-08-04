import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: "decamelize",
})
export class DecamelizePipe implements PipeTransform {
	transform(value: any, ...args: any[]) {
		return value.split(/(?=[A-Z0-9])/).map(capitalizeFirst).join(" ");
	}
}

@Pipe({
	name: "wikiPage",
})
export class WikiPagePipe implements PipeTransform {
	transform(value: any, ...args: any[]) {
		return capitalizeFirst(value.split(/(?=[A-Z0-9])/).join("_").toLowerCase());
	}
}

function capitalizeFirst(s: string) {
	return s.charAt(0).toUpperCase() + s.substring(1);
}