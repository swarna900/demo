import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from './../todo-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];
  editMode: boolean = false;
  currentTodo: Todo;
  showMessage: boolean = false;
  message: string = "";
  constructor(private todoService: TodoService,private ref: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.todos = this.todoService.GetAllTodos();
  }
  onSubmitTodo(todo) {
    if (todo.id > 0) {
      this.todoService.updateTodo(todo);
      this.message = "Todo Updated successfully."
      this.showMessage = true;
    } else {
      this.todoService.addTodo(todo);
      this.message = "Todo Added successfully."
      this.showMessage = true;
    }
    this.ref.detectChanges();
  }
  addEmptyTodo() {
    let todo = 
    {
      contents: '',
      title: '',
      id: 0,
      isEditable:true
    };
    this.todos.push(todo);
  }
  onDelete(todo) {
   
    this.todoService.removeTodo(todo);
    this.message = "Todo Deleted successfully."
    this.showMessage = true;
    this.ref.detectChanges();
  }

  onEdit(todo) {
    this.currentTodo = Object.assign({}, todo);
    this.editMode = true;

  }
  onResetTodo() {
    this.message = ""
    this.showMessage = false;
    this.ref.detectChanges();
  }

}
