import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GerenciadorDePresenca';
  sidebar = true

  recive(status:boolean) {
    this.sidebar = status
  }
}
