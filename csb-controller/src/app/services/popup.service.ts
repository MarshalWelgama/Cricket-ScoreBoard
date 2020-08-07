import {Injectable} from '@angular/core';

import * as _ from 'underscore';

import {Alert} from './../models';

@Injectable()
export class PopupService {
	private _popups: any = {};
	private _preloadQueue: string[] = [];

	constructor() {}

	register(name: string, popup: any) {
		this._popups[name] = popup;
		console.log('PopupService: ' + name + ' registered');

		var preloadIndex = _.indexOf(this._preloadQueue, name);
		if (preloadIndex > -1) {
			this.open(name);
			this._preloadQueue.splice(preloadIndex);
		}
	}

	unregister(name: string) {
		console.log('PopupService: ' + name + ' unregistered');
		delete this._popups[name];
	}

	open(name: string) {
		if (!this._popups[name]) {
			this._preloadQueue.push(name);
			console.log('PopupService: ' + name + ' not found and queued for preload');
		} else {
			this._popups[name].open();
		}
	}

	close(name: string, callback = function(){}) {
		if (!this._popups[name]) {
			console.log('PopupService: ' + name + ' not found');
			return;
		}
		this._popups[name].close(callback);
	}

	alert(alert?: Alert) {
		if (alert && this._popups.alert) {
			alert.popupService = this;
			this._popups.alert.open(alert);
		}
		return this._popups.alert;
	}

	message(message: string) {
		var alert = new Alert({
			title: 'A message from ' + window.location.hostname,
			message: message,
			type: 'message',
			closable: true,
		});
		this._popups.alert.open(alert);
	}

	confirm(title: string, message: string, callback: Function, args?: any, thisArg?) {
		var alert = new Alert({
			type: 'warning',
			closable: true,
			title: title,
			message: message,
			controls: [
				{
					text: 'Yes',
					icon: 'check-circle',
					color: 'warning',
					onClick: () => {
						this.alert().alert.type = 'success';
						this.alert().alert.controls[0].color = 'success';
						this.alert().alert.hideAnimation = 'bounceOut';
						this.close('alert');
						callback.apply(thisArg, args);
					}
				},
				{
					text: 'Cancel',
					icon: 'ban',
					color: 'default',
					onClick: () => {
						this.close('alert');
					}
				},
			]
		});
		this._popups.alert.open(alert);
	}

	loader() {
		if (this._popups.loader) {
			return this._popups.loader;
		}
	}
}