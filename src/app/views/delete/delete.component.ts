import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<DeleteComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.ref.close()
  }

  delete() {
    this.ref.close(true)
  }

}
