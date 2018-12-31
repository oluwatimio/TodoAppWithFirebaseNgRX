import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {TasksComponentComponent} from './tasks-component/tasks-component.component';
import {AddtodoComponent} from './addtodo/addtodo.component';

const routes: Routes = [{path: 'tasks', component: TasksComponentComponent},
  {path: '', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'tasks/addtodo', component: AddtodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
