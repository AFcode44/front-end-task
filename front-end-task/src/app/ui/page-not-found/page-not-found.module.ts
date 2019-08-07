import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    PageNotFoundComponent
  ],
  providers: [],
})
export class PageNotFoundModule { }
