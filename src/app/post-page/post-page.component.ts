import { Component, OnInit } from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {ActivatedRoute, Params} from '@angular/router';
import {IPost} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<IPost>;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id']);
      })
    )
  }

}
