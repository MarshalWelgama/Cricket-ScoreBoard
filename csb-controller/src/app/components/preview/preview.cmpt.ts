import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as _ from 'underscore';
import * as $ from 'jquery';

import {ScoreService} from './../../services';

@Component({
	selector: 'preview',
	templateUrl: './preview.cmpt.html',
	styleUrls: ['./preview.cmpt.scss'],
})
export class PreviewCmpt implements OnInit {
	_ = _;
	time: Date;
	currentRunRate : number;
	requiredRunRate : number;

	@ViewChild('messages') messages: ElementRef;

	constructor(public scoreService: ScoreService) {}

	ngOnInit() {
		setInterval(() => {
			this.time = new Date();
		}, 1000);

		setInterval(() => {
			this.nextMessage();
		}, 20000);
	}

	nextMessage() {
		if (this.scoreService.innings() != null && this.scoreService.innings().status != 'postInnings') {
			var messages = $(this.messages.nativeElement);
			var currentMessage = messages.find('> div:visible');
			if (currentMessage.length == 0 || currentMessage.is(':last-child')) {
				var nextMessage = messages.find('> div:first-child');
			} else {
				var nextMessage = currentMessage.next();
			}
			if (messages.children().length > 1) {
				currentMessage.hide();
				nextMessage.show();
			}
		}
	}

	calculateCurrentRunRate() : number {
		return 0;
	}

	calculateRequiredRunRate() : number {
		return 0;
	}
}