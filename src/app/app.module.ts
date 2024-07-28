import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component'; // Adjust path as needed

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button'; // if you need buttons
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppDataModalComponent } from './data-modal/data-modal.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, DataTableComponent],
  imports: [
    BrowserModule,
    TableModule,
    InputTextModule,
    PaginatorModule,
    ButtonModule,
    BrowserAnimationsModule,
    DialogModule,
    FormsModule,

    AppDataModalComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
