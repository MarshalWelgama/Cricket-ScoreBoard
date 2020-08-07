import * as _ from 'underscore';

import {Team} from './team.model';
import {Game} from './game.model';
import {Over} from './over.model';
import {Batsman} from './batsman.model';
import {Bowler} from './bowler.model';
import {Player} from './player.model';

export class Innings {
	id: number;
	battingTeam: Team;
	bowlingTeam: Team;
	game: Game;
	totals: any;
	batsmen: Batsman[] = [];
	bowlers: Bowler[] = [];
	overs: Over[] = [];
	status: string = '';

	constructor(innings) {
		_.extend(this, innings);
	}

	getBowler(playerId: string) : Bowler {
		return _.findWhere(this.bowlers, {
			id: playerId,
		});
	}

	lastOver() {
		return _.last(this.overs);
	}

	bowlingTeamPlayers() : Player[] {
		if (this.game.home.team == this.bowlingTeam) {
			return this.game.home.players;
		} else {
			return this.game.away.players;
		}
	}

	battingTeamPlayers() : Player[] {
		if (this.game.home.team == this.battingTeam) {
			return this.game.home.players;
		} else {
			return this.game.away.players;
		}
	}

}