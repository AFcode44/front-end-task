import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './ui/login-page/login-page.component';
import { AuthenticationGuard } from './shared/guards/authentication-guard.service';
import { HomeComponent } from './ui/home/home.component';
import { NgModule } from '@angular/core';
import { PostDetailsComponent } from './ui/post-details/post-details.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', canActivate: [AuthenticationGuard], component: HomeComponent },
  {
    path: 'login', component: LoginPageComponent
  },
  { path: '404', component: PageNotFoundComponent },
  { path: 'post/:id', canActivate: [AuthenticationGuard], component: PostDetailsComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
