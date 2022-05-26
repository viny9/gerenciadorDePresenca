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
  testes:any
  hour:any

  constructor(private db:FirebaseService, private turmaId:ActivatedRoute) { }

  ngOnInit(): void {
    this.turmaId.params.subscribe((id:any) => {
      this.pathId = id.turmaId
      this.getAlunos(id)
    })

    this.hour = `${new Date().getHours()}.${new Date().getMinutes()}`
    this.hour = eval(this.hour)
    console.log(this.hour)
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

  presenca(value:any, h?:any) {
    this.frequencia = value.value
    this.horario = h
    
    const teste = {
      presenca: value.value,
      horario: h
    }
  }
 

  addPresenca() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()


    const frequencia = {
      date: `${day}/${month}/${year}`,
      horario: this.horario,
      materia: 'Português',
      presenca: this.frequencia
    }

    console.log(this.horario)

    if(this.frequencia == 'P') {
      this.db.addPresenca(this.pathId, this.id, frequencia)
    } else if(this.frequencia == 'F') {
      this.db.addPresenca(this.pathId, this.id, frequencia)
    } else {
    }
  }

  horarios() {
    const date = new Date()
    const hour = date.getHours()
    this.horario = hour
  }

}
