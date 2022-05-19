import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTurmaComponent } from '../../views/add-turma/add-turma.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor( public dialog: MatDialog) {
   }

  ngOnInit(): void {
  }

  openAddTurma() {
    const ref = this.dialog.open(AddTurmaComponent, {
      width: '500px'
    })
  }

}
