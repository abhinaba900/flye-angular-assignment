import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TableModule,
    InputTextModule,
    PaginatorModule,
    ButtonModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
