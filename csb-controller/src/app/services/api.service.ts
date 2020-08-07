import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import * as _ from 'underscore';
import * as $ from 'jquery';

import {Alert, Team, Player, Game} from './../models';
import {PopupService} from './popup.service';

@Injectable()
export class APIService {
	private apiUri: string = 'http://localhost:5000';
	private endpointError: boolean = false;
	private connectionIssue: boolean = false;
	private connectionCallbacks: any = {
		success: [],
		error: [],
	};

	constructor(private http: HttpClient, private popupService: PopupService) {}

	setConnectionCallback(success, error) {
		if (success != null) {
			this.connectionCallbacks.success.push(success);
		}

		if (error != null) {
			this.connectionCallbacks.error.push(error);
		}
	}
		
	get(endpoint: string, params?: object) : Observable<any> {
		var queryString = '';
		if (params && !_.isEmpty(params)) {
			queryString += '?';
			queryString += $.param(params);
		}
		return this.http.get(this.apiUri + endpoint + queryString);
	}

	delete(endpoint: string) {
		return this.http.delete(this.apiUri + endpoint);
	}

	post(endpoint: string, params: object) {
		return this.http.post(this.apiUri + endpoint, params);
	}

	put(endpoint: string, params: object) {
		return this.http.put(this.apiUri + endpoint, params);
	}

	checkConnection() {
		this.get('/check').subscribe(res => {
			if (this.connectionIssue) {
				this.connectionCallbacks.success.forEach(callback => {
					callback(res);
				});
			}
			if (!this.connectionIssue && this.endpointError) {
				this.popupService.loader().hide(() => {
					this.popupService.alert(new Alert({
						type: 'error',
						title: 'Well this is embarrassing',
						message: 'An error has occurred, please try again or contact the techy person',
						onOpen: alert => {
							alert.animate('shake');
						},
					}));
					this.endpointError = false;
				});
			}
		}, err => {
			this.connectionCallbacks.error.forEach(callback => {
				this.connectionIssue = true;
				callback(err);
			});
		});
	}

	defaultErrorCallback() {
		this.endpointError = true;
		this.checkConnection();
	}

	getTeams(callback) {
		this.get('/team').subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback()
		});
	}

	getTeam(teamId, callback) {
		this.get('/team/' + teamId).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback()
		});
	}

	deleteTeam(teamId, callback) {
		this.delete('/team/' + teamId).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback()
		});
	}

	deletePlayer(teamId, playerId, callback) {
		this.delete('/team/' + teamId + '/players/' + playerId).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback()
		});
	}

	newTeam(team: Team, callback) {
		this.post('/team', team.toJSON()).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback()
		});
	}

	updateTeam(team: Team, callback) {
		this.put('/team/' + team.id + '/update', team.toJSON()).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback()
		});
	}

	newPlayer(team: Team, player: Player, callback) {
		this.put('/team/' + team.id + '/players/new', player.toJSON()).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback()
		});
	}

	updatePlayer(team: Team, player: Player, callback) {
		this.put('/team/' + team.id + '/players/' + player.id + '/update', player.toJSON()).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback()
		});
	}

	getGames(callback) {
		this.get('/game').subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback();
		});
	}

	getGame(game, callback) {
		this.get('/game/' + game.id).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback();
		});
	}

	newGame(game: Game, callback) {
		this.post('/game/new', game.toJSON()).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback();
		});
	}

	undoBall(callback) {
		this.post('/undo', {}).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback()
		});
	}

	getInnings(game, callback) {
		this.get('/game/' + game.id + '/innings').subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback();
		});
	}

	regetInnings(game, innings, callback) {
		this.get('/game/innings/' + innings.id).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback();
		});
	}

	getOver(game, innings, over, callback) {
		this.get('/game/innings/overs/' + over.id).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback();
		});
	}

	newInnings(game, data, callback) {
		this.post('/game/' + game.id + '/innings', data).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback();
		});
	}

	newOver(game, innings, over, callback) {
		this.post('/game/innings/' + innings.id + '/overs/new', {
			bowlerId: over.bowler.id
		}).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback();
		});
	}

	saveOver(game, innings, over, callback) {
		this.post('/game/innings/overs/save', {
			overId: over.id
		}).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback();
		});
	}

	getCurrentOver(game, innings, callback) {
		this.get('/game/innings/' + innings.id + '/over/current').subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback();
		});
	}

	addBall(game, over, ball, callback) {
		this.post('/game/innings/overs/' + over.id + '/balls/new', ball.toJSON()).subscribe(res => {
			callback(res);
		}, () => {
			this.defaultErrorCallback();
		});
	}
}