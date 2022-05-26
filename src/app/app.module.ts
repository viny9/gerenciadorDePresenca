import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeadComponent } from './components/head/head.component'
import { HomeComponent } from './components/home/home.component';
import { TurmaComponent } from './components/turma/turma.component';
import { AlunoComponent } from './components/aluno/aluno.component';
import { AddTurmaComponent } from './views/add-turma/add-turma.component';
import { ListaDeFrequenciaComponent } from './components/lista-de-frequencia/lista-de-frequencia.component';
import { JustificarFaltasComponent } from './views/justificar-faltas/justificar-faltas.component';
import { environment } from '../environments/environment';
import { AddAlunoComponent } from './views/add-aluno/add-aluno.component'
import { LoginLogoutComponent } from './components/login-logout/login-logout.component';

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
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { UpdateTurmaComponent } from './views/update-turma/update-turma.component';
import { UpdateAlunoComponent } from './views/update-aluno/update-aluno.component';

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
    JustificarFaltasComponent,
    AddAlunoComponent,
    LoginLogoutComponent,
    UpdateTurmaComponent,
    UpdateAlunoComponent,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatMenuModule,
    MatSnackBarModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
