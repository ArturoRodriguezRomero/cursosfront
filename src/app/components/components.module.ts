import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../router/app-routing/app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';

import { DataTableComponent } from './data-table/data-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  declarations: [NavbarComponent, DataTableComponent],
  exports: [NavbarComponent, DataTableComponent, MatTableModule]
})
export class ComponentsModule {}
