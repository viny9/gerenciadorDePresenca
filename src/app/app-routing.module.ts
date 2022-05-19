import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoComponent } from './components/aluno/aluno.component';
import { HomeComponent } from './components/home/home.component';
import { ListaDeFrequenciaComponent } from './components/lista-de-frequencia/lista-de-frequencia.component';
import { TurmaComponent } from './components/turma/turma.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent },

  { path: 'turma',
    component: TurmaComponent },

  { path: 'turma/aluno',
    component: AlunoComponent },

  { path: 'turma/frequencia',
    component: ListaDeFrequenciaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
