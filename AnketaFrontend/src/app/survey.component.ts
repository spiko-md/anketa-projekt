import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-survey',
	template: `
  <h1>Dragi solastnik</h1>
  <p>
  Z namenom, da se v mirnem in enotnem duhu odločimo glede prihodnosti hiše
  naših starih staršev, te vabim, da izraziš svoje mnenje v spodnji anketi.
  </p>

  <h2>Anketa</h2>

  <form (ngSubmit)="submit($event)">
  <div class="question">
  <label>Kako zelo si za to, da se hiša proda?</label>
  <input type="range" [(ngModel)]="data.prodaja" name="prodaja" min="1" max="10" />
  <span>{{ data.prodaja }}</span>
  </div>
  <div class="question">
  <label>Bi ti bil pripravljen odkupiti delež?</label>
  <input type="range" [(ngModel)]="data.odkup" name="odkup" min="1" max="10" />
  <span>{{ data.odkup }}</span>
  </div>
  <div class="question">
  <label>Bi bil pripravljen vlagati v obnovo?</label>
  <input type="range" [(ngModel)]="data.obnova" name="obnova" min="1" max="10" />
  <span>{{ data.obnova }}</span>
  </div>
  <div class="question">
  <label>Komentar:</label>
  <textarea [(ngModel)]="data.komentar" name="komentar"></textarea>
  </div>
  <button type="submit">Pošlji mnenje</button>
  </form>
`
})
export class SurveyComponent {
	data: any = {
		prodaja: 5,
		odkup: 5,
		obnova: 5,
		komentar: ''
	};

	constructor(private http: HttpClient) { }

	submit(event: Event) {
		event.preventDefault();
		this.http.post('/api/survey', this.data).subscribe(() => alert("Hvala!"));
	}
}
