import { Component } from '@angular/core';
import { SocialMediaPostService } from '../../../services/social-media-post.service';
import { GetSocialMediaPostModel } from '../models/get-social-media-post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  posts: GetSocialMediaPostModel[] = [];
  errorMessage: string = '';
  constructor(private socialMediaPostService: SocialMediaPostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.socialMediaPostService
      .getSocialMediaPosts()
      .subscribe((response: any) => {
        this.posts = response;
      },
      (error) => {
        console.error('Error fetching posts:', error);
        this.errorMessage = 'Could not load posts. Please try again later.';
      },
    );
  }

  openPostLink(link: string): void {
    if (link) {
      window.open(link, '_blank');
    }
  }
}
