import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/authentication/user.service';
import { Router } from '@angular/router';
import { LogInData } from 'src/app/shared/authentication/user.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public username: string;
  public password: string;
  public errorText = '';

  constructor(private router: Router, private readonly userService: UserService) { }

  ngOnInit() {
  }

  public onLogin(): void {
    const loginData: LogInData = { username: this.username, password: this.password };

    this.errorText = this.userService.isLoginCorrect(loginData);
    if (this.errorText === '') {
      this.userService.login(loginData);
      this.router.navigate(['/']);
    }
  }

  public onKeyPress(event): void {
    if (event.which === 13) {
      this.onLogin();
    }
  }
}
