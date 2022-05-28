import { FirebaseService } from './services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'GerenciadorDePresenca';
  sidebar = false
  sidebarMode:any
  login:any = false
  teste:any = []

  constructor(private dbAuth:AuthService, private db:FirebaseService) { }

  ngOnInit(): void {
    if(window.screen.width < 700) {
      this.sidebarMode = 'over'
      this.sidebar = false
    } else {
      this.sidebarMode = 'side' 
      this.sidebar = true
    }
    
  if(localStorage.getItem('user')!== null) {
    this.dbAuth.admin = true
    this.login = this.dbAuth.admin
  } else {
    this.dbAuth.admin = false
    this.login = this.dbAuth.admin
  }
}


sidebarToggle(status:boolean) {
    this.sidebar = status
  }

  normalAcess(status:boolean) {
    this.login = status
    this.sidebar = false
  }
}
