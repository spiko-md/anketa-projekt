import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { SurveyComponent } from './survey.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'survey', component: SurveyComponent, canActivate: [AuthGuard] }
];

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SurveyComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(routes)
	],
	providers: [AuthGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }