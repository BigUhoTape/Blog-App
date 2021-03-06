import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {IPost} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchPost = '';

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
    ) {
  }

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(item => item.id !== id);
      this.alertService.danger('Post has been removed');
    })
  }


  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
