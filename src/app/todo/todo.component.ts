import { Component } from '@angular/core';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todos: Todo[] = []; // Lista zadań
  newTodoDescription: string = ''; // Opis nowego zadania

  // Dodanie nowego zadania
  addTodo() {
    if (this.newTodoDescription.trim()) {
      const newTodo: Todo = {
        id: Date.now(), // Unikalny ID
        description: this.newTodoDescription,
        completed: false
      };
      this.todos.push(newTodo);
      this.newTodoDescription = ''; // Wyczyszczenie pola
    }
  }

  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed; // Przełączenie stanu completed
    this.todos = [...this.todos];    // Wymuszenie odświeżenia widoku
  }
  
  
}
