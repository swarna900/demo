import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Todo } from '../todo';

@Component({
  selector: 'app-create-todo',
  templateUrl: './todo-create.component.html',
})
export class CreateTodoComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Output() submitTodo = new EventEmitter<Todo>();
  @Output() resetTodo = new EventEmitter();
  @Input() todo: any;
  @Input() editMode = false;
  constructor(private formBuilder: FormBuilder) {
    this.todo = { id: 0 };
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.todo) {
      this.form.controls['title'].setValue(this.todo.title);
      this.form.controls['contents'].setValue(this.todo.contents);
    }
  }
  
  ngOnInit() {
    if (this.todo == null || this.todo == undefined) {
      this.todo = {id:0};
    }
    this.form = this.formBuilder.group({
      title: [this.todo.title, Validators.required],
      contents: [this.todo.contents, [Validators.required]]
    });
  }
  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  onSubmit() {
    if (this.form.valid) {
      let todo = new Todo();

      todo.title = this.form.value.title;
      todo.contents = this.form.value.contents;
      if (this.todo.id > 0) {
        todo.id = this.todo.id;
      }

      this.submitTodo.emit(todo);
      this.reset();
      //this.todoService.addTodo(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }
  reset() {
    this.form.reset();
    this.todo = { id: 0 };
    this.resetTodo.emit();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
