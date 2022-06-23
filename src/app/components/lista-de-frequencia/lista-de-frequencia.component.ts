import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  id:any = []
  alunos = []
  displayedColumns = ['numeroDoAluno', 'nomes', '1', '2', '3', '4', '5', '6'] 
  horario:any
  form:any
  frequencias:any = []
  hour:any = []
  date = new Date()

  constructor(private db:FirebaseService, private turmaId:ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm()
    
    this.turmaId.params.subscribe((res:any) => {
      this.pathId = res.turmaId
      this.getAlunos(res)
      this.getTurmaName(this.pathId)
    })

    this.turno()
  }

  createForm() {
    this.form = new FormGroup({
      nomeDoProfessor: new FormControl('', [Validators.required]),
      materia: new FormControl('', [Validators.required])
    })
  }

  getTurmaName(id:any) {
    this.db.getTurma(id).subscribe((res:any) => {
      this.db.titleInfos = {
      title: res.data().nome
      }
   })
  }

  getAlunos(id:any) {
    const aluno:any = []

    this.db.readAlunos(id.turmaId).subscribe((res:any) => {
      res.forEach((element:any) => {
        aluno.push(element.data())
        this.alunos = aluno
      });

      this.alunos = this.alunos.sort((a:any, b:any) => {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;    
      })
    })
  }

  findAlunoId(nome:any) {
    this.db.readAlunos(this.pathId).subscribe((res:any) => {

      const ids = res.docs
      const names = res.docs.map((res:any) => {
        return res.data().nome
      })

      try {
        const index = names.indexOf(nome)
        this.id.push(ids[index].id)

        //Não vai deixar os ids se repetir
        const filteredArray = this.id.filter((before:any, after:any) => this.id.indexOf(before) == after);
        this.id = filteredArray

      } catch (error) {
          this.db.handleError(error)
        }
      })   
  } 

  presenca(nome:any, value:any) {
    const day = this.date.getDate()
    const month = this.date.getMonth() + 1
    const year = this.date.getFullYear()

    const id = Math.random()

    const frequencia = {
      id:id,
      nome: nome,
      date: `${day}/${month}/${year}`,
      horario: this.horario,
      presenca: value.value,
      materia: this.form.value.materia,
      professor: this.form.value.nomeDoProfessor,
      status: 'Não justificada'
    }
  
    const index = this.frequencias.findIndex((freq:any) => freq.nome == frequencia.nome);
  
    if(index == -1) {
      this.frequencias.push(frequencia)
    } else if(index >= 0) {
      this.frequencias[index] = frequencia
    } else { return }
  }
  
  addPresenca() {
    for (let i = 0; i < this.id.length; i++) {
      this.db.addPresenca(this.pathId, this.id[i], this.frequencias[i])
    }
  }

  turno() {
    this.db.getTurma(this.pathId).subscribe((res:any) => {
      let id

      const turno = res.data().turno
      if(turno == 'Matutino') {
        id = '1LfL4eBlssJaqX4e3Rth'
      } else if (turno == 'Vespertino') {
        id = 'yDh0TfJCS6Xd2T8EwZ5A'
      } else if(turno == 'Noturno') {
        id = 'oFE3a24OoUSlvCqqjCsq'
      }

      this.db.getHorarios(id).subscribe((res:any) => {
        res.forEach((element:any) => {
          this.hour.push(element.data()) 
        });

        this.horarios(this.hour)
      })
    })
  }

  horarios(time: any[]) {
      for (let i = 0; i < time.length; i++) {

      const inicio = time[i].inicio.split(":");
      const fim = time[i].fim.split(":");

      var date1 = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), inicio[0], inicio[1]);
      var date2 = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), fim[0], fim[1]);

      if(this.date >= date1 && this.date < date2) {
        this.horario = i + 1
      }
    }
  }
}