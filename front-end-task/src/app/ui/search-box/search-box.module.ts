import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchBoxComponent
  ],
  providers: [],
})
export class SearchBoxModule { }
