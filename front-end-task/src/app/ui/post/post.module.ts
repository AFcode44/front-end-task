import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    PostComponent
  ],
  providers: [],
})
export class PostModule { }
