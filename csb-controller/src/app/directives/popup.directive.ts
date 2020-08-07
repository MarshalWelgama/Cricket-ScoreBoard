import {Directive, Input, ElementRef} from '@angular/core';

import {PopupService} from './../services';

import * as $ from 'jquery';

@Directive({
	selector: '[popup]',
})
export class PopupDirective {
	@Input() name: string;

	constructor(private el: ElementRef, private popupService: PopupService) {
		this.popupService.register(this.name, this);
	}

	open() {
		$(this.el.nativeElement).fadeIn(300);
	}

	close() {
		$(this.el.nativeElement).fadeOut(300);
	}
}