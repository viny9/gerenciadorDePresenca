import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoComponent } from './components/aluno/aluno.component';
import { GerenciadorDePerfisComponent } from './components/gerenciador-de-perfis/gerenciador-de-perfis.component';
import { HomeComponent } from './components/home/home.component';
import { ListaDeFrequenciaComponent } from './components/lista-de-frequencia/lista-de-frequencia.component';
import { SignupComponent } from './components/signup/signup.component';
import { TurmaComponent } from './components/turma/turma.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [

    { path: '',
      canActivate: [AuthService],
      component: HomeComponent },

    { path: 'turma/:turmaId',
      canActivate: [AuthService],
      component: TurmaComponent },
    
    { path: 'turma/:turmaId/aluno/:alunoId',
      component: AlunoComponent },
    
    { path: 'turma/:turmaId/frequencia',
      canActivate: [AuthService],
      component: ListaDeFrequenciaComponent },

    { path: 'signup',
      canActivate: [AuthService],
      component: SignupComponent },

    { path: 'perfis',
      canActivate: [AuthService],
      component: GerenciadorDePerfisComponent },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
