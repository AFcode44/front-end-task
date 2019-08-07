import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageModule } from './ui/login-page/login-page.module';
import { AuthenticationGuard } from './shared/guards/authentication-guard.service';
import { UserService } from './shared/authentication/user.service';
import { HomeModule } from './ui/home/home.module';
import { PostModule } from './ui/post/post.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchBoxModule } from './ui/search-box/search-box.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PageNotFoundModule } from './ui/page-not-found/page-not-found.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginPageModule,
    HomeModule,
    HttpClientModule,
    PostModule,
    SearchBoxModule,
    AngularFontAwesomeModule,
    PageNotFoundModule
  ],
  providers: [AuthenticationGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
