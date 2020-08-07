import {Component, HostListener, ViewChild, OnInit, Renderer2, ElementRef} from '@angular/core';
import {NgForm} from '@angular/forms';

import * as _ from 'underscore';

import {ToolbarCmpt, ModalCmpt} from './components';

import {Alert, Team, Player, Game, Over, Ball} from './models';

import {DropdownService, APIService, PopupService, TeamsService, GamesService, ScoreService} from './services';

@Component({
	selector: 'app-root',
	templateUrl: './app.cmpt.html',
	styleUrls: ['./app.cmpt.scss']
})
export class AppComponent implements OnInit {
	_ = _;

	@ViewChild(ToolbarCmpt) toolbar: ToolbarCmpt;
	@ViewChild('newGameForm') newGameForm: NgForm;
	@ViewChild('newOverForm') newOverForm: NgForm;
	
	selectedTeam: Team = null;
	selectedPlayer: Player = null;

	constructor(private dropdownService: DropdownService, private apiService: APIService, public popupService: PopupService, private renderer: Renderer2, private teamsService: TeamsService, private gamesService: GamesService, public scoreService: ScoreService) {
		document.addEventListener('click', (event) => this.onDocumentClick(event));
	}

	onDocumentClick(event) {
		if (!event.target.hasAttribute('menu-item') && event.target.closest('[menu-dropdown]') == null) {
			this.dropdownService.closeAllDropdowns();
		}

		if (event.target.closest('.toolbar') == null) {
			this.toolbar.toolbarActive = false;
		}
	}

	ngOnInit() {
		this.apiService.setConnectionCallback(() => {
			this.popupService.alert(new Alert({
				title: 'Successfully Reconnected',
				message: 'A connection to the scoring server was successfully established',
				type: 'success',
				closable: false,
			})).animate('pulse');
		}, () => {
			this.popupService.alert(new Alert({
				title: 'Connection Error',
				message: 'Could not establish a connection to the scoring server',
				type: 'error',
				closable: false,
				controls: [
					{
						text: 'Retry',
						icon: 'sync',
						color: 'default',
						onClick: event => {
							this.apiService.checkConnection();
						}
					},
				]
			})).animate('shake');
		});

		this.apiService.checkConnection();

		this.teamsService.loadTeams(() => {
			this.gamesService.loadGames(() => {
				this.newTeamModalInit();
				this.popupService.open('gamesListModal');
				// this.scoreService.loadGame(this.gamesService.getGames()[0]);
			});
		});
	}

	newTeamModalInit() {
		this.newGameForm.controls.matchTemplate.setValue(this.scoreService.matchTemplates()[0]);
		this.newGameForm.controls.homeTeam.setValue(this.teamsService.defaultTeam());
		this.newGameForm.controls.awayTeam.setValue(this.teamsService.getTeams()[1]);
	}

	manageTeamPlayersList(teamId) {
		this.popupService.loader().show();
		this.teamsService.getTeamPlayers(teamId, team => {
			this.popupService.loader().hide();
			this.selectedTeam = team;
			this.popupService.open('teamPlayersListModal');
		});
	}

	editTeamModal(teamId) {
		var team = this.teamsService.getTeam(teamId);
		this.selectedTeam = team;
		this.popupService.open('editTeamModal');
	}

	editTeam() {
		this.teamsService.updateTeam(this.selectedTeam, res => {
			this.popupService.close('editTeamModal');
		});
	}

	editPlayerModal(player: Player) {
		this.selectedPlayer = player;
		this.popupService.open('editPlayerModal');
	}

	editPlayer() {
		this.teamsService.updatePlayer(this.selectedTeam, this.selectedPlayer, res => {
			this.popupService.close('editPlayerModal');
		});
	}

	newGame(form) {
		_.each(form.homeTeamPlayers, (player, playerNum) => {
			if (typeof player === 'string' && player != '') {
				form.homeTeamPlayers[playerNum] = new Player({
					name: player
				});
				this.teamsService.updatePlayer(form.homeTeam, form.homeTeamPlayers[playerNum]);
			}
		});

		_.each(form.awayTeamPlayers, (player, playerNum) => {
			if (typeof player === 'string' && player != '') {
				form.awayTeamPlayers[playerNum] = new Player({
					name: player
				});
				this.teamsService.updatePlayer(form.awayTeam, form.awayTeamPlayers[playerNum]);
			}
		});

		var game = new Game({
			home: {
				team: form.homeTeam,
				players: form.homeTeamPlayers,
			},
			away: {
				team: form.awayTeam,
				players: form.awayTeamPlayers,
			},
			maxInnings: form.matchTemplate.maxInnings ? form.matchTemplate.maxInnings : 2,
			maxOvers: form.maxOvers,
			outrightAvailable: form.outrightAvailable,
			oversCarryOver: form.oversCarryOver,
			changeoverPeriod: form.changeoverPeriod,
		});

		this.gamesService.newGame(game, () => {
			this.scoreService.loadGame(game);
			this.popupService.open('newInningsModal');
		});
	}

	newOver(form) {
		var nextBowler = _.findWhere(this.scoreService.innings().bowlers, {
			id: form.nextBowler.id,
		});
		// TODO: Create bowler if there are none found
		var newOver = new Over({
			bowler: nextBowler,
		});

		this.gamesService.newOver(this.scoreService.innings(), newOver, () => {
			if (this.scoreService.over() != null) {
				this.newOverForm.controls.nextBowler.setValue(this.scoreService.bowler());
			}
			this.scoreService.setOver(newOver);
			this.popupService.close('newOverModal');
		});
	}

	newInnings(form) {
		this.gamesService.newInnings(this.scoreService.game(), {
			battingTeam: form.battingTeam,
			strikingBatsmanId: form.strikingBatsman.id,
			nonStrikingBatsmanId: form.nonStrikingBatsman.id,
		}, res => {
			this.gamesService.getInnings(this.scoreService.game(), () => {
				this.scoreService.setInnings(this.scoreService.game().lastInnings());
				this.popupService.open('newOverModal');
				this.popupService.close('newInningsModal');
			});
		});
	}

	wicket(form) {
		var ball = new Ball({
			wicket: true,
			howOut: form.howOut,
			batsmanRuns: form.additionalRuns ? form.additionalRuns : 0,
			batsman: form.batsmanOut ? form.batsmanOut : this.scoreService.batsman(),
		});

		ball.nextBatsman = form.nextBatsman;

		this.popupService.close('wicketModal');
		this.gamesService.addBall(this.scoreService.game(), this.scoreService.over(), ball, () => {
			this.scoreService.reloadInnings();
			this.scoreService.reloadOver();
		});
	}
}