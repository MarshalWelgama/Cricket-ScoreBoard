import * as _ from 'underscore';

import {Ball} from './ball.model';

export class Wicket extends Ball {
	public howOut: string;

	constructor(wicket: any) {
		super();
		
		_.extend(this, wicket);
	}
}