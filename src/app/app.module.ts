import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeadComponent } from './components/head/head.component'
import { HomeComponent } from './components/home/home.component';
import { TurmaComponent } from './components/turma/turma.component';
import { AlunoComponent } from './components/aluno/aluno.component';
import { AddTurmaComponent } from './components/add-turma/add-turma.component';
import { ListaDeFrequenciaComponent } from './components/lista-de-frequencia/lista-de-frequencia.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeadComponent,
    HomeComponent,
    TurmaComponent,
    AlunoComponent,
    AddTurmaComponent,
    ListaDeFrequenciaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
