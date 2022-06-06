import { map, Observable, startWith } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatRadioChange } from '@angular/material/radio';

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
  frequencia:any = []
  horario:any
  form:any
  teste:any
  testes:any = []

  //Auto complete
  input = new FormControl()
  filterValue: Observable<string[]>;
  materias:any= ['Portugues', 'Matematica', 'Historia', 'Ingles', 'Geografia']

  constructor(private db:FirebaseService, private turmaId:ActivatedRoute) { 
    this.filterValue = this.input.valueChanges.pipe(
      startWith(null),
      map((materia: string | null) => (materia ? this._filter(materia) : this.materias.slice())),
    );
  }

  //Tentar não deixar mandar duas faltas pelo id

  ngOnInit(): void {
    this.createForm()
    
    this.turmaId.params.subscribe((id:any) => {
      this.pathId = id.turmaId
      this.getAlunos(id)
      this.getTurmaName(this.pathId)
    })

   this.horarios()
  }

  createForm() {
    this.form = new FormGroup({
      nomeDoProfessor: new FormControl('', [Validators.required]),
      materia: new FormControl('', [Validators.required])
    })

    this.teste = new FormGroup({
      value: new FormControl()
    })
  }

  getTurmaName(id:any) {
    this.db.getTurma(id).subscribe((infos:any) => {
      this.db.titleInfos = {
      title: infos.data().nome
      }
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
  presenca(teste:any, value:any) {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    this.db.readAlunos(this.pathId).subscribe(infos => {

      const ids = infos.docs
      const names = infos.docs.map((infos:any) => {
        return infos.data().nome
      })

      const index = names.indexOf(teste)

      const frequencia = {
        id:  ids[index].id,
        date: `${day}/${month}/${year}`,
        horario: 1,
        presenca: value.value,
        materia: this.form.value.materia,
        professor: this.form.value.nomeDoProfessor,
        status: 'Não justificada'
      }

    
    let indexs = this.testes.findIndex( (age:any) => age.id == frequencia.id);
    
    if(indexs == -1) {
      this.testes.push(frequencia)
    }else if(indexs >= 0) {
      this.testes[indexs] = frequencia
    } else {
      console.log('teste')
    }
  })
}
  
 //Vai adicionar a presença
  addPresenca() {
  //Vai adicionar presença para cada item no Array de ids
    for (let i = 0; i < this.id.length; i++) {
      this.db.addPresenca(this.pathId, this.id[i], this.testes[i])
    }
  }

  horarios() {
    const date = new Date()
    const hour = date.getHours()
    const minutes = date.getMinutes()

    //Horarios que a chamada vai estar aberta
    //Matutino
    if(hour == 13 && minutes >= 0 && minutes <= 59) {
      this.horario = 1
    } else if(hour == 23 && minutes >= 0 && minutes < 59) {
      this.horario = 2
    } else if(hour == 13 && minutes >= 0 && minutes < 59) {
      this.horario = 3
    } else if(hour == 4 && minutes >= 0 && minutes < 10) {
      this.horario = 4
    } else if(hour == 4 && minutes >= 0 && minutes < 10) {
      this.horario = 5
    } else if(hour == 4 && minutes >= 0 && minutes < 10) {
      this.horario = 6
    }

    //Verspetino
    // if(hour == 8 && minutes >= 20 && minutes <= 45) {
    //   this.horario = 1
    // } else if(hour == 4 && minutes >= 0 && minutes < 10) {
    //   this.horario = 2
    // } else if(hour == 16 && minutes >= 0 && minutes < 59) {
    //   this.horario = 3
    // } else if(hour == 4 && minutes >= 0 && minutes < 10) {
    //   this.horario = 4
    // } else if(hour == 4 && minutes >= 0 && minutes < 10) {
    //   this.horario = 5
    // } else if(hour == 4 && minutes >= 0 && minutes < 10) {
    //   this.horario = 6
    // }

    //Noturno
    // if(hour == 8 && minutes >= 20 && minutes <= 45) {
    //   this.horario = 1
    // } else if(hour == 4 && minutes >= 0 && minutes < 10) {
    //   this.horario = 2
    // } else if(hour == 16 && minutes >= 0 && minutes < 59) {
    //   this.horario = 3
    // } else if(hour == 4 && minutes >= 0 && minutes < 10) {
    //   this.horario = 4
    // } else if(hour == 4 && minutes >= 0 && minutes < 10) {
    //   this.horario = 5
    // } else if(hour == 4 && minutes >= 0 && minutes < 10) {
    //   this.horario = 6
    // }
  }

  private _filter(value:any): string[] {
    const filterValue = value.toLowerCase()

    return this.materias.filter((turma:any) => {
      turma.toLowerCase().includes(filterValue)
    })
  }

}
