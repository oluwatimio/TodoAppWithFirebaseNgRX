import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Todo} from '../Classes/Todo';
import {from, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  todoCollection: AngularFirestoreCollection<Todo>;
  constructor(private afs: AngularFirestore) {}

  getTodos(): Observable<Todo[]> {
    this.todoCollection = this.afs.collection('todos')

    return this.todoCollection.valueChanges();
  }

  addTodos(todo: Todo) {
    return this.afs.collection('todos').add(todo);
  }

}
