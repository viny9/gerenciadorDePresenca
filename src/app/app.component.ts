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
  user:any = false

  constructor(private dbAuth:AuthService) { }

  ngOnInit(): void {
    //Vai dizer se o usuario fez login e o seu tipo de login
    this.typeOfUser()

    //Dependendo do tamanho da tela a sidebar vai estar fechada por padrão
    this.sidebarModes()
  }

  typeOfUser() {
    if(sessionStorage['tipo'] == 'admin' ) {
      this.login = true
      this.dbAuth.notAdmin = false
    } else if(sessionStorage['tipo'] == 'professor') {
      this.login = true
      this.dbAuth.notAdmin = true
    } else if(sessionStorage['tipo'] == 'user') {
      this.login = true
      this.user = true
      this.dbAuth.user = true
    } else if(sessionStorage['tipo'] == null){
      this.login = false
    }
  }

  sidebarModes() {
    if(window.screen.width < 700) {
      this.sidebarMode = 'over'
      this.sidebar = false
    } else {
      this.sidebarMode = 'side' 
      this.sidebar = true
    }
  }

  //Vai abri e fechar a sidebar
  sidebarToggle(status:boolean) {
      this.sidebar = status
  }

  recive(isLogged:any) {
    this.login = isLogged
  }

}
