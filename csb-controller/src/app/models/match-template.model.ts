import * as _ from 'underscore';

export class MatchTemplate {
	name: string;
	maxOvers: number;
	oversCarryOver: boolean;
	changeoverPeriod: number;
	outrightAvailable: boolean;
	maxInnings: number;

	constructor(match?: object) {
		_.extend(this, match);
	}
}