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
  id:any
  alunos = []
  displayedColumns = ['numeroDoAluno', 'nomes', '1', '2', '3', '4', '5', '6'] 
  frequencia:any
  horario:any

  constructor(private db:FirebaseService, private turmaId:ActivatedRoute) { }

  ngOnInit(): void {
    this.turmaId.params.subscribe((id:any) => {
      this.pathId = id.turmaId
      this.getAlunos(id)
    })
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

  findAlunoId(nome:any) {
    this.db.readAlunos(this.pathId).subscribe(infos => {

      const ids = infos.docs
      const names = infos.docs.map((infos:any) => {
        return infos.data().nome
      })

      const index = names.indexOf(nome)
      this.id = ids[index].id

    })  
  }

  presenca(value:any) {
    this.frequencia = value.value
  }
 

  addPresenca() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const frequencia = {
      date: `${day}/${month}/${year}`,
      horario: 1,
      materia: 'Português',
      presenca: this.frequencia
    }

    if(this.frequencia == 'P') {
      this.db.addPresenca(this.pathId, this.id, frequencia)
    } else if(this.frequencia == 'F') {
      this.db.addPresenca(this.pathId, this.id, frequencia)
    } else {
      console.log('Error')
    }
  }

  horarios() {
    const date = new Date()
    const hour = date.getHours()
    this.horario = hour
  }

}
