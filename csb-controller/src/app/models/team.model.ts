import * as _ from 'underscore';

import {Player} from './player.model';

export class Team {
	id: string;
	miniName: string;
	shortName: string;
	midName: string;
	fullName: string;
	players: Player[];

	constructor(team?: object) {
		_.extend(this, team);
	}

	addPlayer(player) {
		this.players.push(player);
	}

	destroy() {
		this.players = [];
	}

	toJSON() {
		return {
			miniName: this.miniName, 
			shortName: this.shortName, 
			midName: this.midName, 
			fullName: this.fullName
		};
	}

	toPlayersDropdown(exclude: any = {}) {
		exclude = _.values(exclude);
		return _.map(_.filter(this.players, player => {
			return exclude.indexOf(player) == -1;
		}), player => {
			return {
				id: player,
				text: player.name
			};
		});
	}
}