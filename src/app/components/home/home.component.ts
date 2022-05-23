import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  turmas:any  [] = []

  constructor(private db: FirebaseService, private router: Router ) { }

  ngOnInit(): void {
      this.db.getTurma().subscribe((infos:any) => {
        infos.docs.forEach((element:any) => {
          this.turmas.push(element.data())
        });

        //Vai ordenar o array
        this.turmas = this.turmas.sort((a:any, b:any) => {
          return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;    
        })
      })
    }

  //Vai achar o id para navegar para turma escolhida
  selectedTurma(nome:any) {
    this.db.getTurma().subscribe(infos => {

      const ids = infos.docs
      const names = infos.docs.map((infos:any) => {
        return infos.data().nome
      })

      const index = names.indexOf(nome)
      const id = ids[index].id

      this.router.navigate([`turma/${id}`])

    })  
  }

}
