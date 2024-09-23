import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../app.component';
import { TodolistComponent } from './todolist.component';
import { TodolistService } from '../../services/todolist.service'; // Certifique-se de que o caminho está correto

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Adicione o HttpClientModule ao array de imports
    FormsModule
  ],
  providers: [TodolistService],
  bootstrap: [AppComponent]
})
export class AppModule { }