import {Injectable} from '@angular/core';

import * as _ from 'underscore';

import {APIService} from './api.service';
import {TeamsService} from './teams.service';
import {Game, Bowler, Batsman, Innings, Over, Player, Ball} from './../models';

@Injectable()
export class GamesService {
	private loadState: number = 0;
	private _games: any = [];

	constructor(private apiService: APIService, private teamsService: TeamsService) {}

	loadGames(callback = function(){}) {
		this.loadState = 1;
		this.apiService.getGames(games => {
			_.each(games, (game, gameId) => {
				var homeTeam = this.teamsService.getTeam(game.team.home.teamId);
				var awayTeam = this.teamsService.getTeam(game.team.away.teamId);
				this._games[gameId] = new Game({
					id: gameId,
					timestamp: game.timestamp,
					home: {
						team: homeTeam,
						players: [],
					},
					away: {
						team: awayTeam,
						players: [],
					},
				});
			});
			this.loadState = 2;
			callback();
		});
	}

	getGame(gameId: number) {
		return this._games[gameId];
	}

	getGames() {
		if (this.loadState == 0) {
			this.loadGames();
		}
		return this.loadState < 2 ? [] : Object.values(this._games);
	}

	newGame(game: Game, callback = function(res){}) {
		this._games.push(game);
		this.apiService.newGame(game, res => {
			callback(res);
		});
	}

	getGameDetails(game: Game, callback = function(res){}) {
		this.apiService.getGame(game, res => {
			_.each(res.team.home.players, (player, playerId) => {
				player.id = playerId;
				game.home.players.push(new Player(player));
			});
			_.each(res.team.away.players, (player, playerId) => {
				player.id = playerId;
				game.away.players.push(new Player(player));
			});
			callback(res);
		});
	}

	getInnings(game: Game, callback = function(){}) {
		this.apiService.getInnings(game, res => {
			_.each(res, innings => {
				var inningsObj = new Innings({
					id: innings.inningsId,
					game: game,
					battingTeam: game.getTeam(innings.battingTeamId),
					bowlingTeam: game.getTeam(innings.bowlingTeamId),
					totals: innings.totals,
				});

				_.each(innings.bowlingPlayers, player => {
					var bowler: Bowler = game.getPlayer(player.id) as Bowler;
					bowler = _.extend(new Bowler({}), bowler, player.bowling);
					inningsObj.bowlers.push(bowler);
				});

				_.each(innings.players, player => {
					var batsman: Batsman = game.getPlayer(player.id) as Batsman;
					batsman = _.extendOwn(new Batsman({}), batsman, player.batting);
					inningsObj.batsmen.push(batsman);
				});

				_.each(innings.overs, (over, overIndex) => {
					var bowler = inningsObj.getBowler(over.bowlerId);
					var overObj = new Over({
						id: over.overId,
						bowler: bowler,
						// balls: overIndex == innings.overs.length - 1 ? over.balls : [],
						balls: over.balls,
						runs: over.runs,
						wickets: over.wickets,
					});
					inningsObj.overs.push(overObj);
				});


				game.addInnings(inningsObj);
			});
			callback();
		});
	}

	reloadInnings(game: Game, innings: Innings, callback = function(){}) {
		this.apiService.regetInnings(game, innings, res => {
			_.extendOwn(innings.totals, res.totals);

			_.each(res.bowlingPlayers, player => {
				var bowler: Bowler = _.findWhere(innings.bowlers, {
					id: player.id
				});

				bowler = _.extend(bowler, player.bowling);
			});

			_.each(res.players, player => {
				var batsman: Batsman = _.findWhere(innings.batsmen, {
					id: player.id
				});

				batsman = _.extend(batsman, player.batting);
			});

			_.each(res.overs, (over, overIndex) => {
				// var bowler = innings.getBowler(over.bowlerId);
				var overObj = _.findWhere(innings.overs, {
					id: over.id,
				});

				_.extendOwn(overObj, over);
			});

			callback();
		});
	}

	reloadOver(game: Game, innings: Innings, over: Over, callback = function(res){}) {
		this.apiService.getOver(game, innings, over, res => {
			callback(res);
		});
	}

	newInnings(game: Game, data: object, callback = function(res){}) {
		this.apiService.newInnings(game, data, res => {
			callback(res);
		});
	}

	newOver(innings: Innings, over: Over, callback = function(res){}) {
		this.apiService.newOver(innings.game, innings, over, res => {
			over.id = res.overId;
			callback(res);
		});
	}

	getOver(game: Game, innings: Innings, over: Over, callback = function(res){}) {
		this.apiService.getOver(game, innings, over, res => {
			callback(res);
		});
	}

	saveOver(game: Game, innings: Innings, over: Over, callback = function(res){}) {
		this.apiService.saveOver(game, innings, over, res => {
			callback(res);
		});
	}

	getCurrentOver(game: Game, innings: Innings, callback = function(res){}) {
		this.apiService.getCurrentOver(game, innings, res => {
			callback(res);
		});
	}

	addBall(game: Game, over: Over, ball: Ball, callback = function(res){}) {
		this.apiService.addBall(game, over, ball, res => {
			callback(res);
		});
	}
}