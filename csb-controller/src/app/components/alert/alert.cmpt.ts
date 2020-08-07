import {Component, Input, EventEmitter, ViewChild, ElementRef, Renderer2, OnInit, AfterViewInit} from '@angular/core';
import {AnimationService, AnimationBuilder} from 'css-animator';

import {PopupService} from './../../services';

import {Alert} from './../../models';

@Component({
	selector: 'alert',
	templateUrl: './alert.cmpt.html',
	styleUrls: ['./alert.cmpt.scss'],
})
export class AlertCmpt implements OnInit, AfterViewInit {
	private animator: AnimationBuilder;

	@ViewChild('alertContainer') alertContainer: ElementRef;

	alertOpen: boolean = false;
	alert: Alert = new Alert();
	alertIcons: any = {
		confirm: 'question-circle',
		error: 'exclamation-circle',
		warning: 'exclamation-triangle',
		success: 'check-circle',
		message: 'comment-dots',
	};

	constructor(private popupService: PopupService, private animationService: AnimationService, private renderer: Renderer2) {
		this.animator = this.animationService.builder();
	}

	ngOnInit() {
		this.popupService.register('alert', this);
	}

	ngAfterViewInit() { 
		this.renderer.listen(this.alertContainer.nativeElement.parentElement, 'click', (event) => {
			if (event.target.closest('.alert') == null && this.alert.closable == true) {
				this.close();
			}
		});
	}

	open(alert: Alert) {
		this.alert = alert;
		this.alertOpen = true;
		
		var animationType = this.alert.showAnimation;
		
		if (animationType != 'none') {
			this.animator.setType(animationType).setDuration(400).show(this.alertContainer.nativeElement).then(() => {
				this.alert.onOpen(this);
			});
		}
	}

	animate(animationType: string) {
		this.animator.setType(animationType).setDuration(600).animate(this.alertContainer.nativeElement);
	}

	close(callback = function(){}) {
		var animationType = this.alert.hideAnimation;
		
		if (animationType != 'none') {
			this.animator.setType(animationType).setDuration(400).hide(this.alertContainer.nativeElement).then(() => {
				this.alertOpen = false;
				this.alert.onClose(this);
				callback();
			});
		} else {
			this.alertOpen = false;
			callback();
		}
	}
}