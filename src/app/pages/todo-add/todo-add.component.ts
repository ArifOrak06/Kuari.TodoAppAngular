import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoAdd } from 'src/app/models/todo-add';
import { TodoService } from 'src/app/services/todo-service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  todoForm = new FormGroup({
    content: new FormControl(''),
  });
  constructor(
    private router: Router, private todoService : TodoService
  ) { }

  ngOnInit(): void {

    
  }
  addTodo()
  {
    this.todoService.createTodo(this.todoForm.value as TodoAdd).subscribe({
      next:(result) => {
        // data eklenirse service'den true dönecek
        if(result == true)
        {

          this.router.navigateByUrl('/todos');
        }
      }
      
    })
  }

} 
