import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  notAdmin:any = true
  isLogged:any
  turma:any
  user:any

  constructor(private dbAuth: AngularFireAuth, private db:AngularFirestore , private snackBar: MatSnackBar, private router: Router) {}

  canActivate() {
    if(sessionStorage['tipo'] != null) {
      return true
    } else {
      return false
    }
  }
  
  //Login
  signin(email: any, password: any) {
      this.dbAuth.signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        this.typeOfUser(res)  //Verificar se usuario é um professor e passa o tipo de usuario para o localStore
        sessionStorage.setItem('user', JSON.stringify(res.user.uid))
        // sessionStorage.setItem('user', JSON.stringify(res.user.uid))
      })
      .then(() => {
        setTimeout(() => {
          this.router.navigate([`/`])
        }, 500);
      })
      .then(() => {
        //Para ter tempo de fazer tudo na função
        setTimeout(() => {
          window.location.reload()
        }, 800);
      })
      .catch((error: any) => {
        this.signinErrors(error)
      })
  }

  signinErrors(error:any) {
    if(error == 'FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).') {
      this.openSnackbar('Email ou senha incorreto')
    } else if(error == 'FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
      this.openSnackbar('Nenhuma conta com esse email')
    } else if (error == 'FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).') {
      this.openSnackbar('Email ou senha incorreto')
    } else {
      this.openSnackbar(error)
    }
  }

  //Cadastro
  signup(nome:any, email: any, password: any, turmas:any, userType:any) {

    if(userType == 'professor') {
      this.dbAuth.createUserWithEmailAndPassword(email, password)
        .then((res: any) => {
          const prof = {
            nome: nome, 
            turma: turmas,
            email: res.user.email,
            userType: userType,
            uid: res.user.uid,
          }

          const user = {
            nome: nome,
            email: email, 
            type: userType,
            uid: res.user.uid,
          }
  
          this.db.collection('professores').add(prof)
          this.db.collection('users').add(user)
        })
        .then(() => {       //Para dar tempo de eviar as informações pro servidor antes de reniciar a pagina
          setTimeout(() => {     
            window.location.reload()
          }, 500);
        })
        .catch((error: any) => {
          return this.signupErrors(error)
        })

    } else if(userType == 'admin') {
      this.dbAuth.createUserWithEmailAndPassword(email, password).then((res:any) => {

        const user = {
          nome: nome,
          email: email, 
          type: userType,
          uid: res.user.uid,
        }

        this.db.collection('users').add(user)
      })
     .then(() => {       //Para dar tempo de eviar as informações pro servidor antes de reniciar a pagina
          setTimeout(() => {     
            window.location.reload()
          }, 500);
        })
      .catch((error: any) => {
        return this.signupErrors(error)
      })
    }
  }

  signupErrors(error:any) {
    if(error == 'FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).') {
      this.openSnackbar('Email invalido')
    } else if (error == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).') {
      this.openSnackbar('Senha tem que ter pelo menos 6 digitos')
    } else if(error == 'FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
      this.openSnackbar('Esse email já está em uso')
    } else {
      this.openSnackbar(error)
    }
  }
  
  typeOfUser (res:any){
    const professores:any = []
    this.db.collection('professores').get().subscribe((infos:any) => {
      infos.docs.forEach((element:any) => {
        professores.push(element.data())
      });

      const filtered = professores.filter((professor:any) => {
        if(professor.uid == res.user.uid) {
          return professor
        }
      })

        if(filtered.length == 0) {
          sessionStorage.setItem('tipo', JSON.stringify('admin'))
        }else if(filtered.length == 1){
          sessionStorage.setItem('tipo', JSON.stringify('professor'))
        }
      })
  }

  alunoInfos(turmad:any, nome:any) {
    //Vai pegar todas as turmas
    this.db.collection('turmas').get().subscribe((infos:any) => {

      //Vair pegar o id da turma digitada
      this.findId(infos, turmad)

      //Se a turma for achada ele vai atrás do id do aluno
      if(this.turma != undefined) {
        this.getAluno(this.turma, nome)
     }
    })
  }

  getAluno(turma:any, nome:any) {
    //Vai pegar todos os alunos
    this.db.collection('turmas').doc(turma).collection('alunos').get().subscribe((infos:any) => {
   
      //Vai achar o id do aluno digitado
      this.findId(infos, nome)

      //Vai pegar o id da turma e do aluno e colocar na rota
      this.router.navigate([`/turma/${turma}/aluno/${this.turma}`])
    })
  }
  
  findId(infos:any, teste:any) {
      const ids = infos.docs
      const names = infos.docs.map((infos: any) => {
      return infos.data().nome
    })
    
    const index = names.indexOf(teste)
    
    if(names.indexOf(teste) == -1) {
      this.openSnackbar('Turma ou aluno incorreto')
      this.isLogged = false
    } else if(names.indexOf(teste) >= 0){
      this.turma = ids[index].id
      this.isLogged = true
    }
}

  logout() {
    this.dbAuth.signOut()
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('tipo')
    
    window.location.reload()
  }

  //Menssagem de erro
  openSnackbar(message: any) {
    this.snackBar.open(message, 'X', {
      duration: 1500,
      panelClass: 'snackbar',
      verticalPosition: 'top'
    })
  }
}