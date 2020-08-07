import {Component} from '@angular/core';

import * as _ from 'underscore';

import {ScoreService} from './../../services';

@Component({
	selector: 'summary',
	templateUrl: './summary.cmpt.html',
	styleUrls: ['./summary.cmpt.scss'],
})
export class SummaryCmpt {
	_ = _;

	constructor(public scoreService: ScoreService) {}
}