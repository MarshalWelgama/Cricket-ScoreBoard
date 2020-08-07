import {Component, ViewChild, ElementRef, OnInit, Renderer2} from '@angular/core';

import * as _ from 'underscore';

import {PopupService, DropdownService, APIService} from './../../services';

@Component({
	selector: 'toolbar',
	templateUrl: './toolbar.cmpt.html',
	styleUrls: ['./toolbar.cmpt.scss'],
})
export class ToolbarCmpt implements OnInit {
	private displayOptionElements: ElementRef[] = [];

	@ViewChild('displayOptions') displayOptions: ElementRef;
	@ViewChild('displayOptionSummary') displayOptionSummary: ElementRef;
	@ViewChild('displayOptionScorecard') displayOptionScorecard: ElementRef;
	@ViewChild('displayOptionSponsors') displayOptionSponsors: ElementRef;
	@ViewChild('displayOptionTime') displayOptionTime: ElementRef;
	@ViewChild('displayOptionLogo') displayOptionLogo: ElementRef;

	toolbarActive: boolean = false;

	constructor(public popupService: PopupService, private dropdownService: DropdownService, private renderer: Renderer2, private apiService: APIService) {}

	ngOnInit() {
		// this.displayOptionElements = [this.displayOptionSponsors, this.displayOptionScorecard, this.displayOptionSummary, this.displayOptionTime, this.displayOptionLogo];

		// _.each(this.displayOptionElements, displayOption => {
		// 	this.renderer.listen(displayOption.nativeElement, 'click', event => {
		// 		var dropdownMenuItem = event.target.closest('.menu-dropdown-item');
		// 		this.changeDisplayOption(dropdownMenuItem);
		// 	});
		// 	this.renderer.addClass(displayOption.nativeElement, 'menu-dropdown-item-inactive');
		// });

		// this.changeDisplayOption(this.displayOptionLogo.nativeElement);
	}

	changeDisplayOption(option) {
		if (!option.classList.contains('menu-dropdown-item-active')) {
			_.each(this.displayOptionElements, displayOption => {
				if (displayOption.nativeElement != option.nativeElement) {
					this.renderer.removeClass(displayOption.nativeElement, 'menu-dropdown-item-active');
					this.renderer.addClass(displayOption.nativeElement, 'menu-dropdown-item-inactive');
				}
			});

			this.renderer.removeClass(option, 'menu-dropdown-item-inactive');
			this.renderer.addClass(option, 'menu-dropdown-item-active');
		}
	}

	undoBall() {
		this.apiService.undoBall(() => {});
	}
}