import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { PostModule } from '../post/post.module';
import { SearchBoxModule } from '../search-box/search-box.module';
import { PostDetailsModule } from '../post-details/post-details.module';
import { ErrorModalModule } from '../error-modal/error-modal.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    PostModule,
    SearchBoxModule,
    PostDetailsModule,
    ErrorModalModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [],
})
export class HomeModule { }
