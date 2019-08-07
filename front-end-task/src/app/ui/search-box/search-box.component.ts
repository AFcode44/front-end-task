import { Component, OnInit } from '@angular/core';
import { PostService } from '../post/post.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  public searchValue = '';
  private prevSearch = null;
  constructor(private readonly postService: PostService) { }

  ngOnInit() {
  }

  public onKeyPress(event): void {
    if (this.prevSearch === null || this.prevSearch !== this.searchValue) {
      if (event.which === 13 && this.searchValue.length === 0) {
        this.postService.clearFiltered();
        this.postService.startSending();
      } else if (event.which === 13 && this.searchValue.length > 0) {
        this.postService.stopSending();
        this.postService.filterPosts(this.searchValue);
      }
      this.prevSearch = this.searchValue;
    }
  }

  public onSearchApply(): void {
    this.postService.stopSending();
    this.postService.filterPosts(this.searchValue);
  }

}
