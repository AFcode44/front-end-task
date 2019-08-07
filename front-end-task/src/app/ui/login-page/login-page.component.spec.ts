import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/authentication/user.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  const userServiceMock = {
    isLoginCorrect: function () { }
  };

  const routerMock = {};
  let  loginCorrectSpy;
  const errorMsg = 'error text';
  beforeEach(async(() => {
    loginCorrectSpy = spyOn(userServiceMock, 'isLoginCorrect').and.returnValue(errorMsg);
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        FormsModule
      ],
      declarations: [LoginPageComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print error if login is incorrect', () => {
    fixture.debugElement.query(By.css('.login-button')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.error-text')).nativeElement.innerHTML).toEqual(errorMsg);
    expect(loginCorrectSpy).toHaveBeenCalled();
  });

});

describe('LoginPageComponent part2', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  const userServiceMock = {
    isLoginCorrect: function () { },
    login: function () {}
  };

  const routerMock = {
    navigate: function() {}
  };
  let loginCorrectSpy;
  let loginSpy;
  let navigateSpy;
  const errorMsg = '';
  beforeEach(async(() => {
    loginCorrectSpy = spyOn(userServiceMock, 'isLoginCorrect').and.returnValue(errorMsg);
    loginSpy = spyOn(userServiceMock, 'login');
    navigateSpy = spyOn(routerMock, 'navigate');

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        FormsModule
      ],
      declarations: [LoginPageComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to login if no error', () => {
    fixture.debugElement.query(By.css('.login-button')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(loginCorrectSpy).toHaveBeenCalled();
    expect(loginSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
  });

});
