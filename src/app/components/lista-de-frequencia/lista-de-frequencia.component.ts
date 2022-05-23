import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-lista-de-frequencia',
  templateUrl: './lista-de-frequencia.component.html',
  styleUrls: ['./lista-de-frequencia.component.css']
})
export class ListaDeFrequenciaComponent implements OnInit {

  pathId:any
  alunos = []
  displayedColumns = ['numeroDoAluno', 'nomes', '1', '2', '3', '4', '5', '6'] 
  // horario:any

  constructor(private db:FirebaseService, private turmaId:ActivatedRoute) { }

  ngOnInit(): void {
    this.turmaId.params.subscribe((id:any) => {
      this.pathId = id.turmaId
      this.getAlunos(id)
    })
    // this.db.readAlunos()
    // this.horarios()
  }


  getAlunos(id:any) {
    const aluno:any = []

    this.db.readAlunos(id.turmaId).subscribe((infos:any) => {
      infos.forEach((element:any) => {
        aluno.push(element.data())
        this.alunos = aluno
      });

      this.alunos = this.alunos.sort((a:any, b:any) => {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;    
      })
    })
  }

  // horarios() {
  //   const date = new Date()
  //   const hour = date.getHours()
  //   this.horario = hour
  // }

}
