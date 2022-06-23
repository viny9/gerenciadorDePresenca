import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'

//All components
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
import { GerenciadorDePerfisComponent } from './components/gerenciador-de-perfis/gerenciador-de-perfis.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UpdateTurmaComponent } from './views/update-turma/update-turma.component';
import { UpdateAlunoComponent } from './views/update-aluno/update-aluno.component';
import { DeleteComponent } from './views/delete/delete.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { HorariosConfigComponent } from './views/horarios-config/horarios-config.component';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { EditarFaltaComponent } from './views/editar-falta/editar-falta.component';

//Angular Material imports
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
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

//Qr Code import
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode'

//Firebase imports
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

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
    UpdateTurmaComponent,
    UpdateAlunoComponent,
    LoginComponent,
    SignupComponent,
    GerenciadorDePerfisComponent,
    EditarFaltaComponent,
    DeleteComponent,
    UserEditComponent,
    HorariosComponent,
    HorariosConfigComponent,
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
    MatChipsModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCheckboxModule,
    NgxQRCodeModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
