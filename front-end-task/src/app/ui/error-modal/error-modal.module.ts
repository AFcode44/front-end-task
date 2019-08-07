import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorModalComponent } from './error-modal.component';

@NgModule({
  declarations: [
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    ErrorModalComponent
  ],
  providers: [],
})
export class ErrorModalModule { }
