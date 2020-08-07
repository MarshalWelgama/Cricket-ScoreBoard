import {Injectable} from '@angular/core';

import * as _ from 'underscore';

import {GamesService} from './games.service';
import {PopupService} from './popup.service';
import {Game, Bowler, Batsman, Innings, Team, MatchTemplate, Over, Player} from './../models';

@Injectable()
export class ScoreService {
	private _game: Game = null;
	private _innings: Innings = null;
	private _over: Over = null;
	private _batsman: Batsman = null;
	private _offStrikeBatsman: Batsman = null;

	private _matchTemplates = [
		new MatchTemplate({
			name: 'GCA Two Day',
			maxOvers: 85,
			oversCarryOver: true,
			changeoverPeriod: 4,
			outrightAvailable: true,
			maxInnings: 4,
		}),
		new MatchTemplate({
			name: 'GCA One Day',
			maxOvers: 50,
			oversCarryOver: false,
			maxInnings: 2,
		}),
		new MatchTemplate({
			name: 'GCA T20',
			maxOvers: 20,
			oversCarryOver: false,
			maxInnings: 2,
		}),
	];

	constructor(private gamesService: GamesService, private popupService: PopupService) {}

	loadGame(game) {
		this._game = game;

		if (game.home.players.length == 0) {
			this.gamesService.getGameDetails(game, () => {
				this.gamesService.getInnings(this._game, () => {
					if (this._game.innings.length == 0) {
						this.popupService.open('newInningsModal');
					} else {
						console.log(this._game.lastInnings());
						this._innings = this._game.lastInnings();
						this.gamesService.getCurrentOver(this._game, this._innings, over => {
							if (over != null && typeof over === 'object') {
								var bowler = this._innings.getBowler(over.bowlerId);
								var overObj = new Over({
									id: over.overId,
									bowler: bowler,
									balls: over.balls,
									runs: over.runs,
									wickets: over.wickets,
								});

								this._over = overObj;
								this.checkOver();
							} else {
								this.popupService.open('newOverModal');
							}
							this.findBatsmen();
						});
					}
				});
			});
		}
	}

	reloadInnings() {
		this.gamesService.reloadInnings(this._game, this._innings, () => {
			this.findBatsmen();
		});
	}

	reloadOver() {
		this.gamesService.reloadOver(this._game, this._innings, this._over, over => {
			this._over.balls = this._over.convertToBalls(over.balls);
			this._over.runs = over.runs;
			this._over.wickets = over.wickets;

			this.checkOver();
		});
	}

	checkOver() {
		if (this._over.isOver()) {
			var overExists = _.findWhere(this._innings.overs, {
				id: this._over.id,
			});
			if (!overExists) {
				this._innings.overs.push(this._over);
				this.gamesService.saveOver(this._game, this._innings, this._over, res => {
					console.log(res);
				});
			}
			this.popupService.open('newOverModal');
		}
	}

	findBatsmen() {
		this._batsman = _.findWhere(this._innings.batsmen, {
			atCrease: true,
			onStrike: true,
		});

		this._offStrikeBatsman = _.findWhere(this._innings.batsmen, {
			atCrease: true,
			onStrike: false,
		});
	}

	setOver(over) {
		this._over = over;
	}

	setInnings(innings) {
		this._innings = innings;
	}

	game() : Game {
		return this._game;
	}

	bowler() : Bowler {
		return this._over.bowler;
	}

	batsman() : Batsman {
		return this._batsman;
	}

	batsmen() : Batsman[] {
		return _.where(this._innings.batsmen, {
			atCrease: true,
		});
	}

	over() {
		return this._over;
	}

	offStrikeBatsman() : Batsman {
		return this._offStrikeBatsman;
	}

	innings() : Innings {
		return this._innings;
	}

	battingTeam() : Team {
		return this._innings.battingTeam;
	}

	bowlingTeam() : Team {
		return this._innings.bowlingTeam;
	}

	battingTeamPlayers() : Player[] {
		return this._innings.battingTeamPlayers();
	}

	bowlingTeamPlayers() : Player[] {
		return this._innings.bowlingTeamPlayers();
	}

	availableBatsmen() : Batsman[] {
		return _.where(this.battingTeamPlayers(), {
			atCrease: false,
			out: false,
		});
	}

	changeStrike() {

	}

	formatOver(over: number[]) {
		if (over[1] == 0 || over[1] == 6) {
			var overNum = over[0];
			overNum += over[1] == 6 ? 1 : 0;
			return overNum;
		} else {
			return over[0] + '.' + over[1];
		}
	}

	matchTemplates() : MatchTemplate[] {
		return this._matchTemplates;
	}
}