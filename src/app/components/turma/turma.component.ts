import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  alunos = [
  { nome: 'Vinicius', numero: 1 },
]
  
  displayedColumns = ['numeroDoAluno', 'nomes']

  constructor() { }

  ngOnInit(): void {
  }

}

