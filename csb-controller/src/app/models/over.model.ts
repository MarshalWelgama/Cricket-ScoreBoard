import * as _ from 'underscore';

import {Bowler} from './bowler.model';
import {Ball} from './ball.model';

export class Over {
	id: string;
	balls: Ball[];
	bowler: Bowler;
	runs: number;
	wickets: number;

	constructor(over) {
		over.balls = this.convertToBalls(over.balls);

		_.extend(this, over);
	}

	convertToBalls(balls) {
		return _.map(balls, ball => {
			return new Ball(ball);
		});
	}

	isOver() {
		return this.legalBalls() >= 6;
	}

	legalBalls() {
		var legalBalls = 0;
		_.each(this.balls, ball => {
			legalBalls += ball.isLegal() ? 1 : 0;
		});
		return legalBalls;
	}
}