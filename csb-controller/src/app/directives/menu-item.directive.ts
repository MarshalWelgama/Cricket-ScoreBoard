import {Directive, ContentChild, HostListener, ElementRef, AfterViewInit, Renderer2} from '@angular/core';

import {MenuDropdownDirective} from './menu-dropdown.directive';

@Directive({
	selector: '[menu-item]'
})
export class MenuItemDirective implements AfterViewInit {
	@ContentChild(MenuDropdownDirective) dropdown: MenuDropdownDirective;

	@HostListener('click', ['$event']) onClick(event) {
		if (this.dropdown && event.target.closest('[menu-dropdown]') == null) {
			this.dropdown.toggle();
		}
	}

	constructor(private el: ElementRef, private renderer: Renderer2) {}

	ngAfterViewInit() {
		if (this.dropdown != null) {
			this.renderer.addClass(this.el.nativeElement, 'menu-item-dropdown');
		}
	}
}