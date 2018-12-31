export interface Todo {
  id: string;
  todoName: string;
  descriptionOfTodo: string;
  responsible: string;
  isCompleted: boolean;
  uid: string;

  // constructor(id: number, descriptionOfTodo: string, responsible: string, isCompleted: boolean) {
  //   this.id = id;
  //   this.descriptionOfTodo = descriptionOfTodo;
  //   this.responsible = responsible;
  //   this.isCompleted = isCompleted;
  // }
}
