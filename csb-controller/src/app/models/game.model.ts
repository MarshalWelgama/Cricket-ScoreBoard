import * as _ from 'underscore';

import {Team} from './team.model';
import {Innings} from './innings.model';
import {Player} from './player.model';

export class Game {
	id: string;
	timestamp: Date;
	home: any = {
		team: null,
		players: null
	};
	away: any = {
		team: null,
		players: null
	};
	maxInnings: number;
	maxOvers: number;
	changeoverPeriod: number;
	oversCarryOver: number;
	outrightAvailable: boolean;
	innings: Innings[] = [];
	
	constructor(game: object) {
		_.extend(this, game);
	}

	addInnings(innings) {
		this.innings.push(innings);
	}

	getTeam(teamId) {
		if (this.home.team.id == teamId) return this.home.team;
		if (this.away.team.id == teamId) return this.away.team;
		return false;
	}

	getPlayer(playerId: string) : Player {
		var player = _.findWhere(this.home.players, {
			id: playerId,
		});

		if (!player) {
			player = _.findWhere(this.away.players, {
				id: playerId,
			});
		}

		return player;
	}

	lastInnings() : Innings {
		return _.last(this.innings);
	}

	toJSON() : object {
		var output = {
			maxInnings: 2,
			maxOvers: this.maxOvers,
			oversCarryOver: this.oversCarryOver,
			outrightAvailable: this.outrightAvailable,
			changeOverPeriod: this.changeoverPeriod,
			homeId: this.home.team.id,
			awayId: this.away.team.id,
		};

		for (var i = 1; i <= 11; i++) {
			output['home' + i] = this.home.players[i].id;
		}

		for (var i = 1; i <= 11; i++) {
			output['away' + i] = this.away.players[i].id;
		}

		return output;
	}
}