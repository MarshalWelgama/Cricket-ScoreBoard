import {Component, ElementRef, OnInit} from '@angular/core';

import * as $ from 'jquery';

import {PopupService} from './../../services';

@Component({
	selector: 'loader',
	styleUrls: ['./loader.cmpt.scss'],
	template: '',
})
export class LoaderCmpt implements OnInit {
	constructor(private el: ElementRef, private popupService: PopupService) {}

	ngOnInit() {
		this.popupService.register('loader', this);
	}

	open() {
		$(this.el.nativeElement).fadeIn(300);
	}

	close(callback?) {
		var element = $(this.el.nativeElement);
		if (element.is(':visible')) {
			element.fadeOut(300, () => {
				if (callback) {
					callback();
				}
			});
		} else {
			if (callback) {
				callback();
			}
		}
	}

	show() {
		this.open();
	}

	hide(callback?) {
		this.close(callback);
	}
}