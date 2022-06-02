import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gerenciador-de-perfis',
  templateUrl: './gerenciador-de-perfis.component.html',
  styleUrls: ['./gerenciador-de-perfis.component.css']
})
export class GerenciadorDePerfisComponent implements OnInit {

  dataSource:any = []
  displayedColumns:any = ['position', 'nome', 'email', 'type', 'actions']

  constructor(private db:FirebaseService) { }

  ngOnInit(): void {
    const users:any = []

    this.db.getUsers().subscribe((infos:any) => {
      infos.docs.forEach((element:any) => {
        users.push(element.data())
        this.dataSource = users
      });
    })
  }
  
}
