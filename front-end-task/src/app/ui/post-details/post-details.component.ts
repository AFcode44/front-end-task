import { Component, OnInit } from '@angular/core';
import { PostService } from '../post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDataInterface } from '../post/post.interface';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  public postDetails: PostDataInterface;

  public constructor(private route: ActivatedRoute, private router: Router, private readonly postService: PostService) { }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      if ((params.id != null) && (Number(params.id) <= 100) && (Number(params.id) >= 0)) {
        this.postDetails = this.postService.getPostById(Number(params.id));
      } else {
        this.router.navigate(['404']);
      }
    });
  }

  public onGoBackClick(): void {
    this.router.navigate(['']);
    this.postService.clearFiltered();
    this.postService.startSending();
  }
}
