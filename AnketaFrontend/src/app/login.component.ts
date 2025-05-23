import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-login',
	template: `
<div style="max-width: 400px; margin: auto; padding: 2rem">
    <h2>Prijava</h2>
    <form (submit)="login($event)">
      <label>Uporabniško ime: <input [(ngModel)]="username" name="username"></label><br>
      <label>Geslo: <input [(ngModel)]="password" type="password" name="password"></label><br>
      <button>Prijavi</button>
    </form>
    <p *ngIf="error" style="color:red">Prijava ni uspela</p>
</div>
`
})
export class LoginComponent {
	username = '';
	password = '';
	error = false;

	constructor(private http: HttpClient, private router: Router) {
		console.log('login ctr');
	}



	login(event: Event) {
		event.preventDefault();
		this.http.post('/api/login', { username: this.username, password: this.password })
			.subscribe({
				next: () => this.router.navigateByUrl('/'),
				error: () => this.error = true
			});
	}
}