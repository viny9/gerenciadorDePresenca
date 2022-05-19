import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { JustificarFaltasComponent } from 'src/app/views/justificar-faltas/justificar-faltas.component';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  alunoInfos = [
    { dia: '22/2/2222',
      materia: 'Portugues',
      horario: 1
  },
]

  displayedColumns = ['dia', 'materia', 'horario', 'acoes']

  constructor(private ref: MatDialog) { }

  ngOnInit(): void {
  }

  openJustificarFaltas() {
    this.ref.open(JustificarFaltasComponent, {
      width: '500px'
    })
  }

}
