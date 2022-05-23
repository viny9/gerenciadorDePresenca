import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'GerenciadorDePresenca';
  sidebar = true
  login:any = false

  recive(status:boolean) {
    this.sidebar = status
  }

  recive1(status?:boolean) {
    this.login = status
  }

}
