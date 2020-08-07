import * as _ from 'underscore';

export class Player {
	id: string;
	name: string = '';
	shortName: string;
	number: number;

	constructor(player: any) {
		_.extend(this, player);
		this.getShortName();
	}

	getShortName() {
		var [first, last] = this.name.split(' ', 2);
		this.shortName = first.substr(0, 1) + ' ' + last;
	}

	toJSON() {
		return {
			name: this.name,
			number: this.number,
		};
	}
}