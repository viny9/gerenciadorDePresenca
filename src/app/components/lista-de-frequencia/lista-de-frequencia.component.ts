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

  constructor(private db:FirebaseService, private turmaId:ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm()
    
    this.turmaId.params.subscribe((res:any) => {
      this.pathId = res.turmaId
      this.getAlunos(res)
      this.getTurmaName(this.pathId)
    })

  //  this.horarios()
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

  // Vai pegar os valores do radio button
  presenca(nome:any, value:any) {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const frequencia = {
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

  horarios() {
    
    this.db.getTurma(this.pathId).subscribe((res:any) => {
      const turno = res.data().turno
      const date = new Date()
      const hour = date.getHours()
      const minutes = date.getMinutes()
      
    // Matutino
   if(turno == 'matutino') {
      if(hour == 12 && minutes >= 0 && minutes <= 59) {
        this.horario = 1
      } else if(hour == 23 && minutes >= 0 && minutes < 59) {
        this.horario = 2
      } else if(hour == 3 && minutes >= 0 && minutes < 59) {
        this.horario = 3
      } else if(hour == 4 && minutes >= 0 && minutes < 10) {
        this.horario = 4
      } else if(hour == 4 && minutes >= 0 && minutes < 10) {
        this.horario = 5
      } else if(hour == 4 && minutes >= 0 && minutes < 10) {
        this.horario = 6
      }

    } else if(turno == 'verspetino') {

    // Verspetino
      if(hour == 8 && minutes >= 20 && minutes <= 45) {
        this.horario = 1
      } else if(hour == 4 && minutes >= 0 && minutes < 10) {
        this.horario = 2
      } else if(hour == 16 && minutes >= 0 && minutes < 59) {
        this.horario = 3
      } else if(hour == 4 && minutes >= 0 && minutes < 10) {
        this.horario = 4
      } else if(hour == 4 && minutes >= 0 && minutes < 10) {
        this.horario = 5
      } else if(hour == 4 && minutes >= 0 && minutes < 10) {
        this.horario = 6
      }
      
    } else if(turno == 'noturno') {

    // Noturno
    if(hour == 8 && minutes >= 20 && minutes <= 45) {
      this.horario = 1
    } else if(hour == 4 && minutes >= 0 && minutes < 10) {
      this.horario = 2
    } else if(hour == 16 && minutes >= 0 && minutes < 59) {
      this.horario = 3
    } else if(hour == 4 && minutes >= 0 && minutes < 10) {
      this.horario = 4
    } else if(hour == 4 && minutes >= 0 && minutes < 10) {
      this.horario = 5
    } else if(hour == 4 && minutes >= 0 && minutes < 10) {
      this.horario = 6
    }
    }
  })
  }
  
}
