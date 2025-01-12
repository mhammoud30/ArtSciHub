import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PlatformGuidelinesScoreService } from '../../services/platform-guidelines-score.service';

// PrimeNG modules
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-platform-guidelines-score',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabViewModule, // p-tabView, p-tabPanel
    CheckboxModule, // p-checkbox
    ButtonModule, // p-button
    InputTextModule,
  ],
  templateUrl: './platform-guidelines-score.component.html',
  styleUrl: './platform-guidelines-score.component.scss',
})
export class PlatformGuidelinesScoreComponent {
  // Separate FormGroups for each platform
  instagramForm!: FormGroup;
  facebookForm!: FormGroup;
  tiktokForm!: FormGroup;
  youtubeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private platformGuidelinesScoreService: PlatformGuidelinesScoreService
  ) {}

  ngOnInit(): void {
    // Initialize each FormGroup
    this.instagramForm = this.fb.group({
      type: [null, Validators.required], // e.g., 'STORY' or 'REEL'
      brandLogoEarly: [false, Validators.required],
      humanized: [false, Validators.required],
      optimisedForSoundOff: [false, Validators.required],
      simpleMessage: [false, Validators.required],
      soundOn: [false, Validators.required],
      aspectRatio: [false, Validators.required],
      optimalLength: [false, Validators.required],
    });

    this.facebookForm = this.fb.group({
      aspectRatio: [false, Validators.required],
      brandLogoEarly: [false, Validators.required],
      humanized: [false, Validators.required],
      optimalLength: [false, Validators.required],
      optimisedForSoundOff: [false, Validators.required],
      simpleMessage: [false, Validators.required],
      soundOn: [false, Validators.required],
    });

    this.tiktokForm = this.fb.group({
      aspectRatio: [false, Validators.required],
      brandGoodbye: [false, Validators.required],
      brandLink: [false, Validators.required],
      breakThe4thWall: [false, Validators.required],
      humanized: [false, Validators.required],
      simpleMessage: [false, Validators.required],
      soundOn: [false, Validators.required],
      supersPresent: [false, Validators.required],
    });

    this.youtubeForm = this.fb.group({
      aspectRatio: [false, Validators.required],
      brandAudioMention: [false, Validators.required],
      frame: [false, Validators.required],
      introduce: [false, Validators.required],
      pacing: [false, Validators.required],
      reinforce: [false, Validators.required],
      soundOn: [false, Validators.required],
    });
  }

  onSaveInstagram(): void {
    // Only submit the Instagram form
    if (this.instagramForm.valid) {
      this.platformGuidelinesScoreService
        .createInstagramGuidelinesScore(this.instagramForm.value)
        .subscribe({
          next: (res) => console.log('Instagram guidelines saved!', res),
          error: (err) =>
            console.error('Failed to save Instagram guidelines', err),
        });
    }
  }

  onSaveFacebook(): void {
    // Only submit the Facebook form
    if (this.facebookForm.valid) {
      this.platformGuidelinesScoreService
        .createFacebookGuidelinesScore(this.facebookForm.value)
        .subscribe({
          next: (res) => console.log('Facebook guidelines saved!', res),
          error: (err) =>
            console.error('Failed to save Facebook guidelines', err),
        });
    }
  }

  onSaveTiktok(): void {
    // Only submit the Tiktok form
    if (this.tiktokForm.valid) {
      this.platformGuidelinesScoreService
        .createTiktokGuidelinesScore(this.tiktokForm.value)
        .subscribe({
          next: (res) => console.log('Tiktok guidelines saved!', res),
          error: (err) =>
            console.error('Failed to save Tiktok guidelines', err),
        });
    }
  }

  onSaveYoutube(): void {
    // Only submit the Youtube form
    if (this.youtubeForm.valid) {
      this.platformGuidelinesScoreService
        .createYoutubeGuidelinesScore(this.youtubeForm.value)
        .subscribe({
          next: (res) => console.log('YouTube guidelines saved!', res),
          error: (err) =>
            console.error('Failed to save YouTube guidelines', err),
        });
    }
  }
}
