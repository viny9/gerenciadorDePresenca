import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TurmaComponent } from './components/turma/turma.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent },

  { path: 'turma',
    component: TurmaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
