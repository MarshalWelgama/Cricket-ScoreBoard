import * as _ from 'underscore';

export class Alert {
	popupService: any;

	type: string = 'message';
	closable: boolean = true;
	title: string = 'Message Received';
	message: string = 'Test';
	showAnimation: string = 'zoomIn';
	hideAnimation: string = 'zoomOut';
	controls: any = [
		{
			text: 'Ok',
			icon: false,
			color: 'default',
			onClick: (alert) => {
				alert.close();
			},
		}
	];
	onOpen: any = () => {};
	onClose: any = () => {};

	constructor(alert?: object) {
		_.extend(this, alert);
	}

	// ['message', 'success', 'error', 'warning']
}