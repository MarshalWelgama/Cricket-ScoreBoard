import {AfterViewInit, Directive, ElementRef, ContentChildren, QueryList} from '@angular/core';

import {MenuItemDirective} from './menu-item.directive';

@Directive({
	selector: '[menu]',
})
export class MenuDirective implements AfterViewInit {
	@ContentChildren(MenuItemDirective) menuItems: QueryList<MenuItemDirective>;

	constructor(private el: ElementRef) {

	}

	ngAfterViewInit() {
		
	}
}