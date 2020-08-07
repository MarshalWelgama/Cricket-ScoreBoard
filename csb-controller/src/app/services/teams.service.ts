import {Injectable} from '@angular/core';

import * as _ from 'underscore';

import {Team, Player} from './../models';
import {APIService} from './api.service';

@Injectable()
export class TeamsService {
	private loadState: number = 0;
	private _teams: Team[] = [];
	private _defaultHomeTeamId: string;
	private _defaultHomeTeam: Team;

	constructor(private apiService: APIService) {}

	loadTeams(callback = function(){}) {
		this.loadState = 1;
		this.apiService.getTeams(teams => {
			_.each(teams, (team, teamId) => {
				team.id = teamId;
				team.players = [];
				this._teams[team.id] = new Team(team);

			});
			this._defaultHomeTeam = this._defaultHomeTeamId != null ? this._teams[this._defaultHomeTeamId] : _.values(this._teams)[0];
			this.loadState = 2;
			callback();
		});
	}

	getTeam(teamId: number) {
		return this._teams[teamId];
	}

	defaultTeam() {
		return this._defaultHomeTeam;
	}

	blankTeam() {
		return new Team({
			fullName: '',
		});
	}

	getTeams() {
		if (this.loadState == 0) {
			this.loadTeams();
		}
		return this.loadState < 2 ? [] : Object.values(this._teams);
	}

	deleteTeam(teamId: string, callback = function(res){}) {
		this.apiService.deleteTeam(teamId, () => {
			delete this._teams[teamId];
		});
	}

	deletePlayer(teamId: string, playerId: string, callback = function(res){}) {
		this.apiService.deletePlayer(teamId, playerId, () => {
			delete this._teams[teamId].players[playerId];
		});
	}

	updateTeam(team: Team, callback = function(res){}) {
		if (team.id == null) {
			this.apiService.newTeam(team, res => {
				team.id = res.teamId;
				this._teams[team.id] = team;
				callback(res);
			});
		} else {
			this.apiService.updateTeam(team, res => {
				callback(res);
			});
		}
	}

	updatePlayer(team: Team, player: Player, callback = function(res){}) {
		if (player.id == null) {
			this.apiService.newPlayer(team, player, res => {
				player.id = res.playerId;
				team.addPlayer(player);
				callback(res);
			});
		} else {
			this.apiService.updatePlayer(team, player, res => {
				callback(res);
			});
		}
	}

	getTeamPlayers(teamId, callback = function(res){}) {
		var targetTeam = this.getTeam(teamId);
		targetTeam.players = [];
		this.apiService.getTeam(teamId, team => {
			_.each(team.players, (player, playerId) => {
				player.id = playerId;
				targetTeam.players.push(new Player(player));
			});
			callback(targetTeam);
		});
	}
}