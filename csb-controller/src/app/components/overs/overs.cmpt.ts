import {Component} from '@angular/core';

import {ScoreService} from './../../services';

import * as _ from 'underscore';

@Component({
	selector: 'overs',
	templateUrl: './overs.cmpt.html',
	styleUrls: ['./overs.cmpt.scss'],
})
export class OversCmpt {
	_ = _;

	totalRuns: number = 0;
	totalWickets: number = 0;

	constructor(public scoreService: ScoreService) {}

	addRuns(runs: number) : number {
		this.totalRuns += runs;
		return this.totalRuns;
	}

	addWickets(wickets: number) : number {
		this.totalWickets += wickets;
		return this.totalWickets;
	}

	reset() {
		this.totalRuns = 0;
		this.totalWickets = 0;
		return '';
	}
}