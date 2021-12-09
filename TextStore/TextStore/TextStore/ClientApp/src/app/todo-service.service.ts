import { Injectable } from '@angular/core';
import { Todo } from "./todo"
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];
  constructor() { }

  public GetAllTodos(): Todo[] {
    return this.todos;
  }
  public addTodo(todo: Todo) {
    todo.id = this.todos.length == 0 ? 1 : this.todos[this.todos.length - 1].id + 1;
    this.todos.push(todo);
  }

  public removeTodo(todo: Todo) {
    this.todos.forEach((value, index) => {
      if (value.id == todo.id)
        this.todos.splice(index, 1);
    });
  }

  public updateTodo(todo: Todo) {
    this.todos.forEach((value, index) => {
      if (value.id == todo.id)
        value.title = todo.title;
      value.contents = todo.contents;
    });
  }
  
}
