import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-justificar-faltas',
  templateUrl: './justificar-faltas.component.html',
  styleUrls: ['./justificar-faltas.component.css']
})
export class JustificarFaltasComponent implements OnInit {

  justificativa:any

  constructor(private ref:MatDialogRef<JustificarFaltasComponent>) { }

  ngOnInit(): void {
    this.justificativa = new FormGroup({
      justi: new FormControl('')
    })
  }

  close() {
    this.ref.close()
  }

  justificar() {
    this.ref.close(this.justificativa.value.justi)
  }

}
