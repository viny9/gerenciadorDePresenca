import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-turma',
  templateUrl: './add-turma.component.html',
  styleUrls: ['./add-turma.component.css']
})
export class AddTurmaComponent implements OnInit {

  teste:any

  constructor( private ref:MatDialogRef<AddTurmaComponent>, private db: FirebaseService) { }

  ngOnInit(): void {
  }

  addTurma() { 
    const turmaInfos = {
      nome: this.teste
    }

    this.db.addTurma(turmaInfos).then(() => {
      window.location.reload()
    })

  }

  close () {
    this.ref.close()
  }

}
