import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
export const firebaseconfig = environment.config;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {AppServiceService} from './Services/app-service.service';
import {StoreModule} from '@ngrx/store';
import {Reducer} from './root-store/Reducer';
// import {INITIAL_STATE} from './root-store/Reducer';
import { TasksComponentComponent } from './tasks-component/tasks-component.component';
import {EffectsModule} from '@ngrx/effects';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {TodoEffects} from './root-store/TodoEffects';
import {MatListModule} from '@angular/material/list';
import { NavComponent } from './nav/nav.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material';
import { AddtodoComponent } from './addtodo/addtodo.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {AuthService} from './Services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatSnackBarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    TasksComponentComponent,
    NavComponent,
    AddtodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(Reducer),
    EffectsModule.forRoot([TodoEffects]),
    StoreModule.forFeature('init', Reducer),
    EffectsModule.forFeature([TodoEffects]),
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFirestoreModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [AppServiceService, TodoEffects, AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
