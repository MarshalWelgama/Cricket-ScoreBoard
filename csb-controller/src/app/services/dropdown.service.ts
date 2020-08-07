import {Injectable} from '@angular/core';

import * as _ from 'underscore';

import {MenuDropdownDirective} from './../directives';

@Injectable()
export class DropdownService {
	private activeDropdowns: MenuDropdownDirective[] = [];

	openDropdown(dropdown: MenuDropdownDirective) {
		this.activeDropdowns.push(dropdown);
	}

	closeDropdown(dropdown: MenuDropdownDirective) {
		this.activeDropdowns = _.without(this.activeDropdowns, dropdown);
	}

	closeAllDropdowns() {
		_.each(this.activeDropdowns, dropdown => {
			dropdown.close();
		});
		this.activeDropdowns = [];
	}
}