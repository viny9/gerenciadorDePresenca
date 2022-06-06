import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { UserEditComponent } from 'src/app/views/user-edit/user-edit.component';

@Component({
  selector: 'app-gerenciador-de-perfis',
  templateUrl: './gerenciador-de-perfis.component.html',
  styleUrls: ['./gerenciador-de-perfis.component.css']
})
export class GerenciadorDePerfisComponent implements OnInit {

  dataSource:any = []
  displayedColumns:any = ['position', 'nome', 'email', 'type', 'actions']
  id:any
  data:any
  turmas:any

  constructor(private db:FirebaseService, private dialog:MatDialog) { }

  ngOnInit(): void {
    const users:any = []

    this.db.getUsers().subscribe((infos:any) => {
      infos.docs.forEach((element:any) => {
        users.push(element.data())
        this.dataSource = users
      });
    })
  }

  findId(email: any) {
    this.db.getUsers().subscribe(infos => {
      const ids = infos.docs
      const names = infos.docs.map((infos: any) => {
        return infos.data().email
      })

      try {
        const index = names.indexOf(email)
        this.id = ids[index].id

        this.user()
      } catch (error) {
        console.log(error)
      }

    })
  }

  user() {
    this.db.getUser(this.id).subscribe((infos:any) => {
      this.data = infos.data()
    })
  }

  openUser() {
    setTimeout(() => {
      const ref = this.dialog.open(UserEditComponent, {
        width: '500px',
        data: this.data, 
      })

      ref.afterClosed().subscribe((infos:any) => {
        if(infos === undefined) {
          return 
        }else {
    
          const testes = {
            ...this.data,
            ...infos
          }
          
          if(testes.type == 'admin') {
            delete testes.turma
          }

          this.db.updateUser(this.id, testes)
        }
      })
  }, 300);

  }
  
}
