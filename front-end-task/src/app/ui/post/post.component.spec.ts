import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { Subject } from 'rxjs';
import { PostService } from './post.service';
import { Router } from '@angular/router';
import { WallIdInterface } from './post.interface';
import { By } from '@angular/platform-browser';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  const postsFetched$ = new Subject<void>();
  const postsFetchedError$ = new Subject<void>();
  const postsSender$ = new Subject<WallIdInterface>();
  const filterApply$ = new Subject<boolean>();

  const alreadySendedPosts = [
    {wallId: 1, data: {userId: 1, id: 1, title: '1', body: '1'}},
    {wallId: 2, data: {userId: 2, id: 2, title: '2', body: '2'}}
  ];
  const filteredPosts = [];
  const postServiceMock = {
    postsFetched: postsFetched$,
    postsFetchedError: postsFetchedError$,
    postsSender: postsSender$,
    filterApply: filterApply$,
    alreadySendedPosts,
    filteredPosts,
    stopSending: function () { }
  };
  const routerMock = {
    navigate: function() {}
  };

  let stopSendingSpy;
  beforeEach(async(() => {
    stopSendingSpy = spyOn(postServiceMock, 'stopSending');
    TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      providers: [
        { provide: PostService, useValue: postServiceMock },
        { provide: Router, useValue: routerMock }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set posts in input if already exist and id is equal', () => {
    component.wallId = 1;
    fixture.detectChanges();
    expect(component.myPosts).toEqual([alreadySendedPosts[0].data]);
  });

  it('should not set posts in input if already exist but id is not equal', () => {
    component.wallId = 3;
    fixture.detectChanges();
    expect(component.myPosts).toEqual([]);
  });

  it('should add posts if id is equal', () => {
    component.myId = 1;
    postsSender$.next({wallId: 1, data: {userId: 1, id: 1, title: '1', body: '1'}});
    fixture.detectChanges();
    expect(component.myPosts).toEqual([alreadySendedPosts[0].data]);
  });

  it('should add posts if id is not equal', () => {
    component.myId = 1;
    postsSender$.next({wallId: 2, data: {userId: 1, id: 1, title: '1', body: '1'}});
    fixture.detectChanges();
    expect(component.myPosts).toEqual([]);
  });

  it('should clear myPost on filterApply when backup not exist', () => {
    component.myPosts = [alreadySendedPosts[0].data];
    filterApply$.next(true);
    fixture.detectChanges();
    expect(component.myPosts).toEqual([]);
  });

  it('should clear posts on filterApply', () => {
    component.myPosts = [alreadySendedPosts[0].data];
    filterApply$.next(true);
    fixture.detectChanges();
    expect(component.myPosts).toEqual([]);
  });

  it('should stop sending and navigate to post if on postClick', () => {
    component.onPostClick(alreadySendedPosts[0].data);
    expect(stopSendingSpy).toHaveBeenCalled();
  });
});
