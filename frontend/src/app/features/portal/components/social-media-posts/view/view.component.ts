import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialMediaPostService } from '../../../services/social-media-post.service';
import { GetSocialMediaPostModel } from '../models/get-social-media-post.model';
import { CardModule } from 'primeng/card'; // p-card
import { BadgeModule } from 'primeng/badge'; // p-badge
import { PanelModule } from 'primeng/panel';
import { ChipModule } from 'primeng/chip'; // p-chip (optional)
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    BadgeModule,
    PanelModule,
    ChipModule,
    TabViewModule,
    CheckboxModule,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  post!: GetSocialMediaPostModel;

  isAnalyzing = false;
  score: number | null = null;

  maxViews = 100000; // Set these to appropriate maximum values
  maxLikes = 5000; // based on your data
  maxComments = 1000;
  maxShares = 500;

  constructor(
    private route: ActivatedRoute,
    private socialMediaPostService: SocialMediaPostService
  ) {}

  ngOnInit() {
    console.log('Getting post...');
    this.getPost();
    console.log('Post:', this.post);
  }

  async getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.socialMediaPostService
        .getSocialMediaPostById(parseInt(id))
        .subscribe((response: any) => {
          console.log('Got post:', response);
          this.post = response;
        });
    }
  }

  viewPostLink(link: string): void {
    if (link) {
      window.open(link, '_blank');
    }
  }

  startAnalysis() {
    this.isAnalyzing = true;
    this.score = null;

    // First phase: Show analysis animation
    setTimeout(() => {
      // Calculate score (replace with actual calculation later)
      const calculatedScore = Math.floor(Math.random() * 101);

      // Set score but keep overlay visible
      this.score = calculatedScore;

      // Second phase: Show score and fade out overlay
      setTimeout(() => {
        this.isAnalyzing = false;
      }, 1500); // Give time for score display animation
    }, 2500); // Time for initial analysis animation
  }
}
