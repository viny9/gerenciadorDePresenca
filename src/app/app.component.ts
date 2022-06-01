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
  res:any = false

  constructor(private dbAuth:AuthService) { }

  ngOnInit(): void {
    //Vai dizer se o usuario fez login
    if(sessionStorage['tipo'] != null) {
      this.login = true
    } else if(sessionStorage['tipo'] == null) {
      this.login = false
      this.res = true
      this.dbAuth.user = true
    }

    //Dependendo do tamanho da tela a sidebar vai estar fechada por padrão
    if(window.screen.width < 700) {
      this.sidebarMode = 'over'
      this.sidebar = false
    } else {
      this.sidebarMode = 'side' 
      this.sidebar = true
    }

    //Vai dizer se o usuario e admin ou professor
    if(sessionStorage['tipo'] == '"admin"') {
      this.dbAuth.notAdmin = false
    } else if(sessionStorage['tipo'] == '"professor"'){
      this.dbAuth.notAdmin = true
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
