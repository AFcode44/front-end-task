import { Component } from '@angular/core';
import { PostService } from '../post/post.service';
import { UserService } from 'src/app/shared/authentication/user.service';
import { ResponsiveEnum } from 'src/app/shared/responsive/responsive.enum';
import { ResponsiveService } from 'src/app/shared/responsive/responsive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public fetchingError = false;
  public currentClass = '';

  public constructor(public postService: PostService, private userService: UserService,
    private readonly responsiveService: ResponsiveService) {

    this.postService.postsFetched.subscribe(() => {
      this.fetchingError = false;
      this.postService.startSending();
    });

    this.postService.postsFetchedError.subscribe(() => {
      this.fetchingError = true;
    });

    this.responsiveService.getMobileStatus.subscribe((value: ResponsiveEnum) => {
      if (value === ResponsiveEnum.MOBILE) {
        this.currentClass = 'mobile';
      } else if (value === ResponsiveEnum.TABLET) {
        this.currentClass = 'tablet';
      } else {
        this.currentClass = 'desktop';
      }
    });

  }

  public onLogOut(): void {
    this.userService.logOut();
  }
}
