import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-justificar-faltas',
  templateUrl: './justificar-faltas.component.html',
  styleUrls: ['./justificar-faltas.component.css']
})
export class JustificarFaltasComponent implements OnInit {

  constructor(private ref:MatDialogRef<JustificarFaltasComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.ref.close()
  }

  justificar() {
    this.ref.close()
  }

}
