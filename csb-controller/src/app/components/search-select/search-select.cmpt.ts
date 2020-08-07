import {Component, Input, Output, ViewChild, ElementRef, Renderer, OnChanges, EventEmitter} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import * as _ from 'underscore';
import * as $ from 'jquery';

@Component({
	selector: 'search-select',
	templateUrl: './search-select.cmpt.html',
	styleUrls: ['./search-select.cmpt.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR, 
		useExisting: SearchSelectCmpt, 
		multi: true
	}],
	host: {
		'(document:click)': 'clickOutDropdown($event)',
	},
})

export class SearchSelectCmpt implements ControlValueAccessor {
	private selectedValue;
	private selectedOption;
	private changed = new Array();
	private touched = new Array();
	private open: boolean = false;
	private filteredOptions: any = [];
	private allOptions: any = [];
	private isCustom: boolean = false;
	
	@Input() startText: string = 'Select Player..';
	@Input() customText: string = 'Custom Option';
	@Input() allowCustom: boolean = false;
	@Output() change = new EventEmitter();
	@ViewChild('search') searchBox: ElementRef;
	@ViewChild('container') container: ElementRef;
	@ViewChild('custom') customOption: ElementRef;

	constructor (private renderer: Renderer, private el: ElementRef) {
		this.filteredOptions = this.options;
	}

	get value() {
		return this.selectedValue;
	}

	set value(value) {
		if (this.selectedValue != value) {
			this.selectedValue = value;
			this.changed.forEach(fn => fn(value));
		}
	}

	@Input()
	get options() {
		return this.allOptions;	
	}

	set options(options) {
		this.allOptions = options;
		this.checkFilteredOptions(); 
	}

	clickOutDropdown(event) {
		if (!this.el.nativeElement.contains(event.target)) {
			this.open = false;
		}
	}

	checkFilteredOptions() {
		if (this.searchBox.nativeElement.value == '') {
			this.filteredOptions = this.options;
		} else {
			var keyword = this.searchBox.nativeElement.value;
			var keywords = keyword.split(' ');
			this.filteredOptions = _.filter(this.allOptions, option => {
				var valid = [];
				_.each(keywords, word => {
					if (option.text.toLowerCase().indexOf(word.toLowerCase()) > -1) {
						valid.push(true);
					} else {
						valid.push(false);
					}
				});
				return valid.indexOf(false) == -1;
			});
		}
	}

	toggleDropdown() {
		this.open = !this.open;

		if (this.open == true && this.selectedOption != null) {
			this.searchBox.nativeElement.value = this.selectedOption.text;
		}

		setTimeout(() => {
			$(this.searchBox.nativeElement).focus();
		}, 100);
	}

	writeValue(value) {
		this.selectedValue = value;
	}

	registerOnChange(fn) {
		this.changed.push(fn);
	}

	registerOnTouched(fn) {
		this.touched.push(fn);
	}

	selectOption(id) {
		this.selectedValue = id;
		this.changed.forEach(fn => fn(id));
		this.change.emit(id);
		this.selectedOption = _.findWhere(this.options, {id: this.selectedValue});
		this.searchBox.nativeElement.value = '';
		this.isCustom = false;
		setTimeout(() => {
			this.open = false;
		}, 100);
	}

	selectCustom() {
		this.open = false;
		this.isCustom = true;
		setTimeout(() => {
			$(this.customOption.nativeElement).focus();
		}, 100);
	}

	setCustomName(event) {
		this.selectedValue = event.srcElement.value;
		this.changed.forEach(fn => fn(this.selectedValue));
		this.change.emit(this.selectedValue);
	}
}