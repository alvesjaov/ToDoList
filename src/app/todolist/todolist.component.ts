import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodolistService } from '../../services/todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray: any[] = [];

  constructor(private todolistService: TodolistService) { }

  ngOnInit(): void {
    this.loadTasks(); // Carrega as tarefas ao iniciar o componente
  }

  // Carrega as tarefas do banco de dados
  loadTasks() {
    this.todolistService.getTasks().subscribe({
      next: (tasks) => {
        this.taskArray = tasks; // Atualiza o array de tarefas
      },
      error: (error) => {
        console.error('Erro ao carregar tarefas:', error);
      }
    });
  }

  // Adiciona uma nova tarefa com ID gerado manualmente
  onSubmit(form: NgForm) {
    const maxId = this.taskArray.length > 0 
      ? Math.max(...this.taskArray.map(task => task.id)) 
      : 0; // Se não houver tarefas, o ID será 1
  
    const newTask = {
      id: maxId + 1, // ID manualmente incrementado
      title: form.controls['tarefa'].value,
      completed: false
    };
  
    this.todolistService.addTask(newTask).subscribe({
      next: (task) => {
        this.taskArray.push(task); // Adiciona a nova tarefa à lista
        form.reset(); // Reseta o formulário após a adição
      },
      error: (error) => {
        console.error('Erro ao adicionar tarefa:', error);
      }
    });
  }

  // Deleta uma tarefa específica pelo índice
  onDelete(index: number) {
    console.log(`Deletando tarefa no índice ${index}`);
    const task = this.taskArray[index];
    if (task?.id) {
      console.log(`Chamando serviço para deletar tarefa com ID ${task.id}`);
      this.todolistService.deleteTask(task.id).subscribe({
        next: () => {
          console.log(`Tarefa com ID ${task.id} deletada com sucesso.`);
          this.taskArray.splice(index, 1); // Remove a tarefa da lista
        },
        error: (error) => {
          console.error(`Erro ao deletar a tarefa com ID ${task.id}:`, error);
        }
      });
    } else {
      console.error('Tarefa não encontrada ou ID inválido');
    }
  }
  
  // Marca uma tarefa como completa/incompleta
  onCheck(index: number) {
    console.log(`Marcando tarefa no índice ${index}`);
    const task = this.taskArray[index];
    if (task?.id) {
      task.completed = !task.completed; // Alterna o status de completado
      console.log(`Chamando serviço para atualizar tarefa com ID ${task.id}`);
      this.todolistService.updateTask(task.id, task).subscribe({
        next: () => {
          console.log(`Tarefa com ID ${task.id} atualizada com sucesso.`);
        },
        error: (error) => {
          console.error(`Erro ao atualizar a tarefa com ID ${task.id}:`, error);
        }
      });
    } else {
      console.error('Tarefa não encontrada ou ID inválido');
    }
  }
}