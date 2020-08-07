import * as _ from 'underscore';
import * as $ from 'jquery';

import {Batsman} from './batsman.model';

export class Ball {
	public totalRuns: number;
	public extras: any = {
		byes: 0,
		legByes: 0,
		wides: 0,
		noBalls: 0,
	};
	public batsmanRuns: number = 0;

	public wicket: boolean = false;
	public howOut: string = '';

	public batsman: Batsman = null;
	public nextBatsman: Batsman = null;

	constructor(ball: any = {}) {
		_.extend(this, ball);
	}

	isLegal() {
		return this.extras.noBalls > 0 || this.extras.wides > 0 ? false : true;
	}

	display() : string {
		var output = '';
		
		if (this.wicket == true) {
			output += 'W';
		} else if (this.extras.noBalls > 0) {
			output += this.extras.noBalls > 1 ? this.extras.noBalls : '';
			output += 'NB';
		} else if (this.extras.wides > 0) {
			output += this.extras.wides > 1 ? this.extras.wides : '';
			output += 'WD';
		} else if (this.extras.legByes > 0) {
			output += this.extras.legByes > 1 ? this.extras.legByes : '';
			output += 'LB';
		} else if (this.extras.byes > 0) {
			output += this.extras.byes > 1 ? this.extras.byes : '';
			output += 'B';
		} else if (this.totalRuns == 0) {
			output += $('<p>&#x25cf;</p>').text();
		} else {
			output += this.totalRuns;
		}

		
		return output;
	}

	toJSON() {
		return {
			byes: this.extras.byes,
			legByes: this.extras.legByes,
			wides: this.extras.wides,
			noBalls: this.extras.noBalls,
			batsmanId: this.batsman ? this.batsman.id : 0,
			runs: this.batsmanRuns,
			howOut: this.howOut,
			wicket: this.wicket,
			retiredHurt: false,
			nextBatsmanId: this.nextBatsman ? this.nextBatsman.id : 0,
		};
	}
}