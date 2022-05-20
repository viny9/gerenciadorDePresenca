import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  alunos:any [] = []
  
  displayedColumns = ['numeroDoAluno', 'nomes']

  constructor(private db:FirebaseService) { }

  ngOnInit(): void {
    this.db.getAlunos().subscribe((infos:any) => {
      infos.forEach((element:any) => {
        this.alunos.push(element.data())
      });
    })
}

}

