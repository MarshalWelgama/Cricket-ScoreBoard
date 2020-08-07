import {Component} from '@angular/core';

import * as _ from 'underscore';

import {ScoreService} from './../../services';

@Component({
	selector: 'scorecard',
	templateUrl: './scorecard.cmpt.html',
	styleUrls: ['./scorecard.cmpt.scss'],
})
export class ScorecardCmpt {
	_ = _;

	constructor (public scoreService: ScoreService) {}

	actualBowlers() {
		return _.filter(this.scoreService.innings().bowlers, bowler => {
			return bowler.overs[0] > 0 || bowler.overs[1] > 0;
		});
	}
}