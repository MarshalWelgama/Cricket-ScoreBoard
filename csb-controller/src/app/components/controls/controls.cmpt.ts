import {Component} from '@angular/core';

import * as _ from 'underscore';

import {GamesService, ScoreService, PopupService} from './../../services';
import {Ball} from './../../models';

@Component({
	selector: 'controls',
	templateUrl: './controls.cmpt.html',
	styleUrls: ['./controls.cmpt.scss'],
})
export class ControlsCmpt {
	_ = _;
	selectingRuns: boolean = false;
	extraType: string = '';
	processing: boolean = false;

	constructor(public gamesService: GamesService, public scoreService: ScoreService, public popupService: PopupService) {}

	addBatsmanRun(runs: number) {
		var ball = new Ball({
			batsman: this.scoreService.batsman(),
			batsmanRuns: runs,
		});	
		this.processing = true;
		this.gamesService.addBall(this.scoreService.game(), this.scoreService.over(), ball, () => {
			this.processing = false;
			this.scoreService.reloadInnings();
			this.scoreService.reloadOver();
		});
	}

	selectRuns(runs: number) {
		if (!this.selectingRuns) {
			this.addBatsmanRun(runs);
		} else {
			this.selectingRuns = false;
			var ball = new Ball({
				batsman: this.scoreService.batsman(),
			});

			ball.extras[this.extraType] = runs;

			this.processing = true;
			this.gamesService.addBall(this.scoreService.game(), this.scoreService.over(), ball, () => {
				this.processing = false;
				this.scoreService.reloadInnings();
				this.scoreService.reloadOver();
			});
		}
	}

	addExtras(type) {
		switch (type) {
			case 'wides':
			case 'byes':
			case 'legByes':
			case 'noBalls':
				this.selectingRuns = true;
				this.extraType = type;
				break;

		}
	}
}