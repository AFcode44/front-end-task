import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Subject } from 'rxjs';
import { ResponsiveEnum } from 'src/app/shared/responsive/responsive.enum';
import { PostModule } from '../post/post.module';
import { SearchBoxModule } from '../search-box/search-box.module';
import { PostDetailsModule } from '../post-details/post-details.module';
import { ErrorModalModule } from '../error-modal/error-modal.module';
import { UserService } from 'src/app/shared/authentication/user.service';
import { ResponsiveService } from 'src/app/shared/responsive/responsive.service';
import { PostService } from '../post/post.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const postsFetched$ = new Subject<void>();
  const postsFetchedError$ = new Subject<void>();
  const getMobileStatus$ = new Subject<ResponsiveEnum>();

  const userServiceMock = {
    logOut: function () { }
  };

  const responsiveServiceMock = {
    getMobileStatus: getMobileStatus$
  };

  const postServiceMock = {
    postsFetched: postsFetched$,
    postsFetchedError: postsFetchedError$,
    postsSender: new Subject<void>(),
    filterApply: new Subject<void>(),
    alreadySendedPosts: [],
    filteredPosts: [],
    startSending: function () { }
  };
  const routerMock = {};


  let startSendingSpy;
  let logOutSpy;
  beforeEach(async(() => {
    startSendingSpy = spyOn(postServiceMock, 'startSending');
    logOutSpy = spyOn(userServiceMock, 'logOut');
    TestBed.configureTestingModule({
      imports: [
        PostModule,
        SearchBoxModule,
        PostDetailsModule,
        ErrorModalModule,
        HttpClientModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ResponsiveService, useValue: responsiveServiceMock },
        { provide: PostService, useValue: postServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start sending on postsFetched', () => {
    component.fetchingError = true;
    postsFetched$.next();
    expect(component.fetchingError).toEqual(false);
    expect(startSendingSpy).toHaveBeenCalled();
  });

  it('should set fetchingError after postsFetchedError', () => {
    postsFetchedError$.next();
    expect(component.fetchingError).toEqual(true);
  });

  it('should set proper class on getMobileStatus', () => {
    getMobileStatus$.next(ResponsiveEnum.DESKTOP);
    expect(component.currentClass).toEqual('desktop');

    getMobileStatus$.next(ResponsiveEnum.MOBILE);
    expect(component.currentClass).toEqual('mobile');

    getMobileStatus$.next(ResponsiveEnum.TABLET);
    expect(component.currentClass).toEqual('tablet');
  });

  it('should logOut onClick', () => {
    fixture.debugElement.query(By.css('.log-out')).triggerEventHandler('click', {});
    expect(logOutSpy).toHaveBeenCalled();
  });
});
