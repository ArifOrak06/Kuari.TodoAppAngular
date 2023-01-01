import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoUpdate } from 'src/app/models/todo-update';
import { TodoService } from 'src/app/services/todo-service';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css']
})
export class TodoUpdateComponent implements OnInit {
  todoForm = new FormGroup({
    content: new FormControl(''),
    id: new FormControl(0),
  });

  id : number | undefined;
  constructor(
    private todoService : TodoService,
    private activatedRoute : ActivatedRoute,
    private router : Router

  ) { }

  ngOnInit(): void {


    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id')); // url'den string geldiği için number tipine dönüştürüldü.

    // güncellenecek olan datanın id'sini todoList componentinden gönderilen url üzerinden aldık şimdi bu aldığımız id değerini service'e gönderip bu idye sahip datayı
    // seçelim ve kayıtlı property değerlerini form değerlerine set edelim arayüzde kullanıcıya gösterelim.
    this.todoService.getTodoById(this.id).subscribe({
      next : (result) => {
        this.todoForm.get('content')?.setValue(result.content);
        this.todoForm.get('id')?.setValue(result.id);
      }
    })


    

  }



  updateTodo()
  {
    this.todoService.updateTodo(this.todoForm.value as TodoUpdate).subscribe({
      next: (result) => {
        if(result == true){
          this.router.navigateByUrl('/todos');
        }
        else
        {
          alert('İş  Güncellenemedi.');
        }
      }
    })
  }
}
