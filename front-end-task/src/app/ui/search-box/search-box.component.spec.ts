import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';
import { PostService } from '../post/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  
  const postServiceMock = {
    filterPosts: function() {},
    clearFiltered: function () {},
    startSending: function () {},
    stopSending: function () {}
  };
  let stopSendingSpy;
  let startSendingSpy;
  let clearFilteredSpy;
  let filterPostsSpy;
  beforeEach(async(() => {
    stopSendingSpy = spyOn(postServiceMock, 'stopSending');
    startSendingSpy = spyOn(postServiceMock, 'startSending');
    clearFilteredSpy = spyOn(postServiceMock, 'clearFiltered');
    filterPostsSpy = spyOn(postServiceMock, 'filterPosts');

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        FormsModule
      ],
      declarations: [ SearchBoxComponent ],
      providers: [
        { provide: PostService, useValue: postServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stop sending new posts and start filtering on enter', () => {
    component.searchValue = 'filtr';
    fixture.debugElement.query(By.css('.searchTerm')).triggerEventHandler('keypress', {which: 13});

    expect(stopSendingSpy).toHaveBeenCalled();
    expect(filterPostsSpy).toHaveBeenCalled();
  });

  it('should start sending new posts and clear filter', () => {
    fixture.debugElement.query(By.css('.searchTerm')).triggerEventHandler('keypress', {which: 13});

    expect(startSendingSpy).toHaveBeenCalled();
    expect(clearFilteredSpy).toHaveBeenCalled();
  });

  it('should stop sending and start filter on search apply', () => {
    fixture.debugElement.query(By.css('.searchButton')).triggerEventHandler('click', {});

    expect(stopSendingSpy).toHaveBeenCalled();
    expect(filterPostsSpy).toHaveBeenCalled();
  });
});
