import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoComponent } from './components/aluno/aluno.component';
import { HomeComponent } from './components/home/home.component';
import { ListaDeFrequenciaComponent } from './components/lista-de-frequencia/lista-de-frequencia.component';
import { LoginLogoutComponent } from './components/login-logout/login-logout.component';
import { TurmaComponent } from './components/turma/turma.component';

const routes: Routes = [

    { path: '',
      component: HomeComponent,},

    { path: 'turma/:turmaId',
      component: TurmaComponent},

    { path: 'turma/:turmaId/aluno/:alunoId',
      component: AlunoComponent },

    { path: 'turma/:turmaId/frequencia',
      component: ListaDeFrequenciaComponent},

    { path: ':signup',
      component: LoginLogoutComponent},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
