import { Injectable } from '@angular/core';
import { LogInData } from './user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor() { }

  public isLogged(): boolean {
     return sessionStorage.getItem('userData') ? true : false;
  }

  public login(data: LogInData): void {
    sessionStorage.setItem('userData', JSON.stringify({username: data.username, password: data.password}));
  }

  public logOut(): void {
    sessionStorage.removeItem('userData');
    window.location.reload();
  }

  public isLoginCorrect(loginData: LogInData): string {
    if (!loginData.username || (loginData.username.length === 0) || (loginData.username.length < 5)) {
      return 'Invalid name format';
    } else if (!loginData.password || loginData.password.length !== 8) {
      return 'Invalid password format';
    } else if (
      (!/[A-Z]/.test(loginData.password)) || (!/[a-z]/.test(loginData.password)) || (!/\d/.test(loginData.password))) {
      return 'Password should contain exactly 8 character, one small and one capital letter and at least one number'
    }

    return '';
  }
}
