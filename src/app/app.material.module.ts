import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSortModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSelectModule
} from '@angular/material';

import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    BrowserModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    BrowserModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,

  ]
})
export class MaterialModule {}
