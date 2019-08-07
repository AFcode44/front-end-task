import { Injectable } from '@angular/core';
import { PostDataInterface, WallIdInterface } from './post.interface';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { ResponsiveService } from 'src/app/shared/responsive/responsive.service';
import { ResponsiveEnum } from 'src/app/shared/responsive/responsive.enum';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  public availablePosts = new Array<PostDataInterface>();
  public postsCounter = 0;
  public sendingInterval = null;

  public alreadySendedPosts = Array<WallIdInterface>();
  public filteredPosts = Array<WallIdInterface>();

  private postsFetched$ = new Subject<void>();
  private postsFetchedError$ = new Subject<void>();

  private postsUri = 'https://jsonplaceholder.typicode.com/posts';

  private numberOfWalls = 3;
  private currentWallNumber = 1;
  private postSender$ = new Subject<WallIdInterface>();
  private filterApply$ = new Subject<boolean>();
  private currentWallFilteredNumber = 1;

  public constructor(private readonly httpClient: HttpClient, private readonly responsiveService: ResponsiveService) {
    this.responsiveService.getMobileStatus.subscribe((value: ResponsiveEnum) => {
      if (value === ResponsiveEnum.MOBILE) {
        this.numberOfWalls = 1;
      } else if (value === ResponsiveEnum.TABLET) {
        this.numberOfWalls = 2;
      } else {
        this.numberOfWalls = 3;
      }
    });
    this.fetchPosts();
  }

  public fetchPosts(): void {
    this.httpClient.get<PostDataInterface[]>(this.postsUri).subscribe((posts: PostDataInterface[]) => {
      this.availablePosts = posts.sort((a: PostDataInterface, b: PostDataInterface) => a.id - b.id).reverse();
      this.availablePosts.map((elem: PostDataInterface) => elem.userId = this.makeid(10));
      this.postsFetched$.next();
    },
      (error) => {
        this.postsFetchedError$.next();
      });
  }

  public getPosts(): Array<PostDataInterface> {
    return this.availablePosts.slice(0, this.postsCounter);
  }

  public getPost(): PostDataInterface {
    const output = this.availablePosts[this.postsCounter];
    this.postsCounter++;
    return output;
  }

  public getPostById(id: number): PostDataInterface {
    return this.availablePosts[this.availablePosts.findIndex((elem) => elem.id === id)];
  }

  public get postsFetched(): Observable<void> {
    return this.postsFetched$.asObservable();
  }

  public get postsFetchedError(): Observable<void> {
    return this.postsFetchedError$.asObservable();
  }

  public get postsSender(): Observable<WallIdInterface> {
    return this.postSender$.asObservable();
  }

  public get filterApply(): Observable<boolean> {
    return this.filterApply$.asObservable();
  }

  public startSending(): void {
    this.sendingInterval = setInterval(() => {
      if (this.postsCounter === 100) {
        clearInterval(this.sendingInterval);
      } else {
        if (this.currentWallNumber > this.numberOfWalls) {
          this.currentWallNumber = 1;
        }
        const newPost = { wallId: this.currentWallNumber, data: this.availablePosts[this.postsCounter] };
        this.alreadySendedPosts.push(newPost);
        this.postSender$.next(newPost);
        this.currentWallNumber++;
        this.postsCounter++;
      }

    }, 1000);
  }

  public stopSending(): void {
    clearInterval(this.sendingInterval);
  }

  public filterPosts(filterText: string): void {
    this.filteredPosts = [];
    this.currentWallFilteredNumber = 1;
    this.alreadySendedPosts.forEach((el) => {
      if (el.data.title.includes(filterText) || el.data.body.includes(filterText)) {
        if (this.currentWallFilteredNumber > this.numberOfWalls) {
          this.currentWallFilteredNumber = 1;
        }
        this.filteredPosts.push({ wallId: this.currentWallFilteredNumber, data: el.data });
        this.currentWallFilteredNumber++;
      }
    });

    this.filterApply$.next(true);
    this.filteredPosts.forEach((el: WallIdInterface) => {
      this.postSender$.next(el);
    });
  }

  public clearFiltered(): void {
    this.filteredPosts = [];
    this.filterApply$.next(false);
  }

  private makeid(length): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
