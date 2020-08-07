import {Component, Input, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AnimationService, AnimationBuilder} from 'css-animator';

import {PopupService} from './../../services';

import * as $ from 'jquery';

@Component({
	selector: 'modal',
	templateUrl: './modal.cmpt.html',
	styleUrls: ['./modal.cmpt.scss'],
})
export class ModalCmpt {
	private animator: AnimationBuilder;

	modalOpen: boolean = false;
	
	@ViewChild('modal') modalEl: ElementRef;
	@ViewChild('modalWrapper') modalWrapperEl: ElementRef;
	@Input('name') name: string;
	@Input('title') title: string;
	@Input('closeable') closeable: boolean = true;
	@Input('size') size: string = 'md';
	@Output() onClose: EventEmitter<any> = new EventEmitter();
	@Output() onButtonClick: EventEmitter<any> = new EventEmitter();

	constructor(private animationService: AnimationService, public popupService: PopupService) {
		this.animator = this.animationService.builder();
	}

	ngOnInit() {
		this.popupService.register(this.name, this);
		this.onButtonClick.subscribe((name, event, modal) => {
			if (name == 'okDefault') {
				this.close();
			}
		});
	}

	ngOnDestroy() {
		this.popupService.unregister(this.name);
	}

	open() {
		this.modalOpen = true;

		this.animator.setType('zoomIn').setDuration(400).show(this.modalEl.nativeElement).then(() => {}).catch(() => {});
		$(this.modalWrapperEl.nativeElement).fadeIn(400);
	}

	close(callback = function(){}) {
		this.animator.setType('zoomOut').setDuration(400).hide(this.modalEl.nativeElement).then(() => {
			this.modalOpen = false;
			this.onClose.emit(null);
			callback();
		}).catch(() => {});
		$(this.modalWrapperEl.nativeElement).fadeOut(400);
	}

	wrapperClick(event) {
		if (event.target.classList.contains('modal-wrapper') == true && this.closeable == true) {
			this.close();
		}
	}
}