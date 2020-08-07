import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {AnimatorModule} from 'css-animator';
import {NgModule} from '@angular/core';

import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
 
library.add(fas, far);

import {AppComponent} from './app.cmpt';

import {ToolbarCmpt, ControlsCmpt, PreviewCmpt, SummaryCmpt, OversCmpt, AlertCmpt, ModalCmpt, LoaderCmpt, ScorecardCmpt, SearchSelectCmpt} from './components';

import {DropdownService, APIService, PopupService, ScoreService, TeamsService, GamesService} from './services';

import {MenuDirective, MenuItemDirective, MenuDropdownDirective, PopupDirective} from './directives';

@NgModule({
	declarations: [
		OversCmpt,
		AlertCmpt,
		ModalCmpt,
		LoaderCmpt,
		ToolbarCmpt,
		PreviewCmpt,
		SummaryCmpt,
		ControlsCmpt,
		ScorecardCmpt,
		SearchSelectCmpt,
		AppComponent,
		MenuDirective,
		PopupDirective,
		MenuItemDirective,
		MenuDropdownDirective,
	],
	imports: [
		FormsModule,
		BrowserModule,
		AnimatorModule,
		HttpClientModule,
		FontAwesomeModule,
	],
	providers: [
		APIService,
		GamesService,
		PopupService,
		TeamsService,
		ScoreService,
		DropdownService,
	],
	bootstrap: [AppComponent]
})
export class AppModule {}