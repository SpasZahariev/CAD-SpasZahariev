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
  MatSelectModule,
  MatRadioModule
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
    MatRadioModule,
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
    MatRadioModule,
  ]
})
export class MaterialModule {}
