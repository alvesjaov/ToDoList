import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  apiUrl = 'http://localhost:3000/todos'; // Atualize a porta aqui

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    console.log('Fetching tasks from:', this.apiUrl);
    return this.http.get(this.apiUrl);
  }

  addTask(task: any): Observable<any> {
    console.log('Adding task:', task);
    return this.http.post(this.apiUrl, task);
  }

  deleteTask(id: number): Observable<any> {
    console.log('Deleting task with ID:', id);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(id: number, task: any): Observable<any> {
    console.log('Updating task with ID:', id, 'to:', task);
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }
}