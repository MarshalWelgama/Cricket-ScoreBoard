import {Directive, OnInit, ElementRef, Renderer2} from '@angular/core';

import * as $ from 'jquery';

import {DropdownService} from './../services';

@Directive({
	selector: '[menu-dropdown]'
})
export class MenuDropdownDirective implements OnInit {
	private isOpen: boolean = false;

	constructor(private el: ElementRef, private dropdownService: DropdownService, private renderer: Renderer2) {}

	ngOnInit() {
		this.close();
	}

	toggle() {
		if (!this.isOpen) {
			this.open();
		} else {
			this.close();
		}
	}

	open() {
		this.dropdownService.closeAllDropdowns();
		this.isOpen = true;
		// $(this.el.nativeElement).slideDown(300);
		this.el.nativeElement.style.display = 'block';
		this.dropdownService.openDropdown(this);
		this.renderer.addClass(this.el.nativeElement.parentElement, 'menu-item-active');
	}

	close() {
		this.isOpen = false;
		// $(this.el.nativeElement).slideUp(300);
		this.el.nativeElement.style.display = 'none';
		this.dropdownService.closeDropdown(this);
		this.renderer.removeClass(this.el.nativeElement.parentElement, 'menu-item-active');
	}
}