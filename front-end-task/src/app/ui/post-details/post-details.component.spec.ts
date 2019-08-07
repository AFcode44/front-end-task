import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailsComponent } from './post-details.component';
import { Subject } from 'rxjs';
import { PostService } from '../post/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WallIdInterface } from '../post/post.interface';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  const postsFetched$ = new Subject<void>();
  const postsFetchedError$ = new Subject<void>();
  const postsSender$ = new Subject<WallIdInterface>();
  const filterApply$ = new Subject<boolean>();
  const params$ = new Subject<any>();
  const alreadySendedPosts = [];
  const filteredPosts = [];
  const postServiceMock = {
    postsFetched: postsFetched$,
    postsFetchedError: postsFetchedError$,
    postsSender: postsSender$,
    filterApply: filterApply$,
    alreadySendedPosts,
    filteredPosts,
    getPostById: function () { return {userId: 2, id: 2, title: '2', body: '2'}; }
  };

  const routerMock = {
    navigate: function() {}
  };
  const activatedRouteMock = {
    params: params$
  };
  let navigateSpy;
  beforeEach(async(() => {
    navigateSpy = spyOn(routerMock, 'navigate');
    TestBed.configureTestingModule({
      declarations: [ PostDetailsComponent ],
      providers: [
        { provide: PostService, useValue: postServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    component.postDetails = {userId: 1, id: 1, title: '1', body: '1'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save postDetails', () => {
    params$.next({id: 10});
    fixture.detectChanges();
    expect(component.postDetails).toEqual({userId: 2, id: 2, title: '2', body: '2'});
  });

  it('should navigate to 404 if path not exist', () => {
    params$.next({id: 1000});
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalled();
  });
});
