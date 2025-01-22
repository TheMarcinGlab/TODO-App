import { Component, OnInit } from '@angular/core';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodoDescription: string = '';
  newTodoPriority: 'low' | 'medium' | 'high' = 'low';
  editTodoId: number | null = null;
  editedDescription: string = '';
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor() {}

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(): void {
    const description = this.newTodoDescription.trim();
    if (description) {
      this.todos.push({
        id: Date.now(),
        description,
        completed: false,
        priority: this.newTodoPriority
      });
      this.newTodoDescription = '';
      this.newTodoPriority = 'low';
      this.saveToLocalStorage();
    }
  }

  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
    this.saveToLocalStorage();
  }

  startEditing(todo: Todo): void {
    this.editTodoId = todo.id;
    this.editedDescription = todo.description;
  }

  saveEdit(): void {
    if (this.editTodoId !== null) {
      const todo = this.todos.find(t => t.id === this.editTodoId);
      if (todo) {
        todo.description = this.editedDescription.trim();
      }
      this.editTodoId = null;
      this.editedDescription = '';
      this.saveToLocalStorage();
    }
  }

  cancelEdit(): void {
    this.editTodoId = null;
    this.editedDescription = '';
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.saveToLocalStorage();
  }

  getFilteredTodos(): Todo[] {
    if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }
}
