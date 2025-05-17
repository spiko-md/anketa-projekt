import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-survey',
  template: \`
    <h2>Anketa</h2>
    <form (submit)="submit($event)">
      <label>Prodaja: <input type="range" [(ngModel)]="prodaja" name="prodaja" min="1" max="10"> {{ prodaja }}</label><br>
      <label>Odkup: <input type="range" [(ngModel)]="odkup" name="odkup" min="1" max="10"> {{ odkup }}</label><br>
      <label>Obnova: <input type="range" [(ngModel)]="obnova" name="obnova" min="1" max="10"> {{ obnova }}</label><br>
      <label>Komentar: <textarea [(ngModel)]="komentar" name="komentar"></textarea></label><br>
      <button>Pošlji</button>
    </form>
  \`
})
export class SurveyComponent {
  prodaja = 5;
  odkup = 5;
  obnova = 5;
  komentar = '';

  constructor(private http: HttpClient) {}

  submit(event: Event) {
    event.preventDefault();
    this.http.post('/api/survey', {
      prodaja: this.prodaja,
      odkup: this.odkup,
      obnova: this.obnova,
      komentar: this.komentar
    }).subscribe(() => alert("Hvala!"));
  }
}