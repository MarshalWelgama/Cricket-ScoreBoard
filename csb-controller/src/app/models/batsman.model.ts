import {Player} from './player.model';

export class Batsman extends Player {
	onStrike: boolean = false;
	atCrease: boolean = false;
	retiredHurt: boolean = false;
	runs: number = 0;
	balls: number = 0;
	fours: number = 0;
	sizes: number = 0;
	out: boolean = false;

	status() : string {
		if (this.out == false && this.atCrease == true) {
			return 'no.';
		} else if (this.out == true) {
			return 'out';
		}
		return '';
	}
}