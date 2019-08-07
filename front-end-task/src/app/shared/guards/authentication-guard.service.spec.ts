import { TestBed } from '@angular/core/testing';
import { AuthenticationGuard } from './authentication-guard.service';
import { UserService } from '../authentication/user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


describe('AuthenticationGuard', () => {
  const userService = {
    isLogged: function () { }
  };
  const router = {
    navigate: function () { }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  it('should return true if user is already logged created', () => {
    const service: AuthenticationGuard = new AuthenticationGuard(userService as UserService, router as any);
    const isLoggedSpy = spyOn(userService, 'isLogged').and.returnValue(true);
    expect(service.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toEqual(true);
    expect(isLoggedSpy).toHaveBeenCalled();
  });

  it('should return false and navigate to login if user is not logged', () => {
    const service: AuthenticationGuard = new AuthenticationGuard(userService as UserService, router as any);
    const navigateSpy = spyOn(router, 'navigate');
    expect(service.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toEqual(false);
    expect(navigateSpy).toHaveBeenCalled();
  });
});
