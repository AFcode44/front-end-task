import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details.component';

@NgModule({
  declarations: [
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    PostDetailsComponent
  ],
  providers: [],
})
export class PostDetailsModule { }
