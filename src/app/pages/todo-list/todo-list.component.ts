import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo-service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList : Todo[] = [];
  constructor(private todoService : TodoService ) { }

  ngOnInit(): void {
    this.load();
  }

  //Tüm dataları tutacak method
  load()
  {
    this.todoService.getAll().subscribe({
      next:(result) => {
        this.todoList  = result;
      }
    })

  }
  delete(id:number)
  {
    this.todoService.deleteTodo(id).subscribe( {
      next:(result) => {
        if(result)
        {
          this.load(); //result true ise parametre olarak gönderilen data silinmiş demektir, yani silinme işleminden geriye kalan datayı yüklesin çünkü ekrana bastıracağız.
        }
        else
        {
          alert('Todo Silinemedi.!');
        }
      },
      error:(err) => {
        console.warn(err);
      }
    })
  }

  isCompleted(id:number)
  {
    this.todoService.isCompleted(id).subscribe({
      next:(result) => {
        if(result == true)
        {
          // eğerki ilgili todo'nun isCompleted propertysi true ise bunu seçip tersine çevirmek gerekmektedir. False yapalım, false ise true yapalım
          // sonuçta isCompleted işin bitip bitmediği ile ilgili durumu tutacak olan checkbox
          let index = this.todoList.findIndex(x => x.id == id);
          this.todoList[index].isCompleted != this.todoList[index].isCompleted;

        }
      }
    })
  }
  

}
