import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { UserEditComponent } from 'src/app/views/user-edit/user-edit.component';
import { DeleteComponent } from 'src/app/views/delete/delete.component';

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

  constructor(private db:FirebaseService, private dialog:MatDialog) {
    this.db.titleInfos = {
      title: 'Perfis'
    }
   }

  ngOnInit(): void {
    const users:any = []

    this.db.getUsers().subscribe((res:any) => {
      res.docs.forEach((element:any) => {
        users.push(element.data())
        this.dataSource = users
      });
    })
  }

  findId(email: any) {
    this.db.getUsers().subscribe(res => {
      const ids = res.docs
      const names = res.docs.map((res: any) => {
        return res.data().email
      })

      try {
        const index = names.indexOf(email)
        this.id = ids[index].id
        this.user()

      } catch (error) {
        this.db.handleError(error)
      }

    })
  }

  user() {
    this.db.getUser(this.id).subscribe((res:any) => {
      this.data = res.data()
    })
  }

  openUser() {
    setTimeout(() => {
      const ref = this.dialog.open(UserEditComponent, {
        width: '500px',
        data: this.data, 
      })

      ref.afterClosed().subscribe((res:any) => {
        if(res === undefined) {
          return 
        }else {
          const user = {
            ...this.data,
            ...res
          }
          
          if(user.type == 'admin') {
            delete user.turma
          }

          this.db.updateUser(this.id, user)
        }
      })
  }, 300);

  }
  
  deleteUser() {
    const ref = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: 'Você deseja remover esse usuário ?'
    })

    ref.afterClosed().subscribe((res:any) => {
      if(res != undefined) {
        this.db.deleteUser(this.id)
      }
    })
  }
}
