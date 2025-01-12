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

  analysisStage: number = 0;

  // Example "tech lines"
  techLines = [
    '[SYSTEM INIT] Checking system integrity...',
    '[I/O] Loading language models...',
    '[PROCESS] Neural net iteration #1...',
    '[PROCESS] Neural net iteration #2...',
    '[SECURITY] Data encryption in progress...',
    // Add more lines as you wish
  ];

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
    // Reset states each time:
    this.isAnalyzing = true;
    this.score = null;
    this.analysisStage = 0; // ensures we start from stage 0

    // We can show each stage with a small delay (e.g., 2 seconds per stage).
    let currentStage = 0;
    const totalStages = 4;
    const stageDelay = 3000;

    // Function to show next stage
    const showNextStage = () => {
      currentStage++;
      this.analysisStage = currentStage;

      if (currentStage < totalStages) {
        // Schedule next stage
        setTimeout(showNextStage, stageDelay);
      } else {
        // All stages shown; calculate the score
        const calculatedScore = Math.floor(Math.random() * 101);
        this.score = calculatedScore;

        // Wait a bit so the user can see the final stage & score inside the overlay
        setTimeout(() => {
          this.isAnalyzing = false;
        }, 3500);
      }
    };

    // Start the chain of stages
    showNextStage();
  }

}
