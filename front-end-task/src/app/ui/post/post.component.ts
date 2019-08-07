import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { PostService } from './post.service';
import { PostDataInterface, WallIdInterface } from './post.interface';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public myPosts = new Array<PostDataInterface>();
  public myId: number;

  private myPostsBackup = new Array<PostDataInterface>();

  @Input() public set wallId(id: number) {
    this.myId = id;
    this.myPosts.push(...
      this.postService.alreadySendedPosts
        .filter((post: WallIdInterface) => post.wallId === this.myId)
        .map((post: WallIdInterface) => post.data));
  }

  public constructor(public postService: PostService, private router: Router) {

    this.postService.postsSender.pipe(
      filter((post: WallIdInterface) => post.wallId === this.myId))
      .subscribe((data: WallIdInterface) => {
        this.myPosts.push(data.data);
      });

    this.postService.filterApply.subscribe((value: boolean) => {
      if (value === true) {
        if (this.myPostsBackup.length === 0) {
          this.myPostsBackup = this.myPostsBackup.concat(this.myPosts);
        }
        this.myPosts = [];
      } else {
        this.myPosts = [];
        this.myPosts = this.myPosts.concat(this.myPostsBackup);
        this.myPostsBackup = [];
      }
    });
  }

  ngOnInit() {
  }

  public onPostClick(postNumber: PostDataInterface): void {
    this.postService.stopSending();
    this.router.navigate([`post/${postNumber.id}`]);

  }
}
