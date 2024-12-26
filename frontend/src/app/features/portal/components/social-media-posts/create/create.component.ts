import { Component, ElementRef, HostListener } from '@angular/core';
import { SocialMediaPostService } from '../../../services/social-media-post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateSocialMediaPost } from '../models/create-social-media-post.model';
import { Platform } from '../enums/platform.enum';
import { Thumbnail } from '../enums/thumbnail.enum';
import { Format } from '../enums/format.enum';
import { Concept } from '../enums/concept.enum';
import { CreativeType } from '../enums/creative-type.enum';
import { Sound } from '../enums/sound.enum';
import { TargetAudience } from '../enums/target-audience.enum';
import { Duration } from '../enums/duration.enum';
import { Language } from '../enums/language.enum';
import { ContentTone } from '../enums/content-tone.enum';
import { CampaignObjective } from '../enums/campaign-objective.enum';
import { BrandService } from '../../../services/brand.service';
import { GetBrandsModel } from '../../brands/models/get-brands.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallToAction } from '../enums/call-to-action.enum';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  post: CreateSocialMediaPost = {
    link: '',
    platform: Platform.FACEBOOK,
    thumbnail: Thumbnail.CAPTIONED_MEME,
    format: Format.SQUARE,
    concept: Concept.CELEBRITY_CONTENT,
    creativeType: CreativeType.VIDEO,
    sound: [],
    targetAudience: TargetAudience.AFFINITY,
    duration: Duration.SevenToFifteenSeconds,
    views: 0,
    comments: 0,
    likes: 0,
    shares: 0,
    saves: 0,
    language: Language.ENGLISH,
    callToAction: CallToAction.BUY_NOW,
    promoCode: false,
    hook: false,
    publishedAt: new Date(),
    contentTone: ContentTone.EDUCATIONAL,
    campaignObjective: CampaignObjective.AWARENESS,
    brandId: 0,
  };

  platforms: string[] = Object.values(Platform);
  thumbnails: string[] = Object.values(Thumbnail);
  formats: string[] = Object.values(Format);
  concepts: string[] = Object.values(Concept);
  creativeTypes: string[] = Object.values(CreativeType);
  sounds: Sound[] = Object.values(Sound) as Sound[];
  targetAudiences: string[] = Object.values(TargetAudience);
  durations: string[] = Object.values(Duration);
  languages: string[] = Object.values(Language);
  contentTones: string[] = Object.values(ContentTone);
  campaignObjectives: string[] = Object.values(CampaignObjective);
  callToActions: string[] = Object.values(CallToAction);
  brands: GetBrandsModel[] = [];

  message: string = '';
  isLoading: boolean = false;
  formSections = {
    brand: true,
    content: false,
    creative: false,
    metrics: false,
    engagement: false,
    campaign: false,
  };

  dropdownOpen = false;

  constructor(
    private snackBar: MatSnackBar,
    private socialMediaPostService: SocialMediaPostService,
    private brandService: BrandService,
    private eRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.fetchBrands();
  }

  fetchBrands(): void {
    this.brandService.getBrands().subscribe(
      (response: any) => {
        this.brands = response;
      },
      (error) => {
        console.error('Error fetching brands:', error);
        this.message = 'Failed to load brands. Please try again.';
      }
    );
  }

  onBrandSelect(): void {
    if (this.post.brandId) {
      this.formSections.content = true;
    }
  }

  toggleSection(section: keyof typeof this.formSections): void {
    this.formSections[section] = !this.formSections[section];
  }

  isFormValid(): boolean {
    return (
      this.post.brandId !== 0 &&
      this.post.link.trim() !== '' &&
      this.post.callToAction.trim() !== ''
    );
  }

  onSubmit(form: any): void {
    this.formSections = {
      brand: false,
      content: false,
      creative: false,
      metrics: false,
      engagement: false,
      campaign: false,
    };
    if (form.valid && this.isFormValid()) {
      this.isLoading = true;
      console.log('Form is valid. Sending request...');
      this.socialMediaPostService.createSocialMediaPost(this.post).subscribe(
        (response) => {
          console.log('Post created successfully:', response);
          this.showSnackbar('Social media post created successfully!', 'Close');
          setTimeout(() => {
            form.reset();
            this.isLoading = false;
            this.formSections = {
              brand: true,
              content: false,
              creative: false,
              metrics: false,
              engagement: false,
              campaign: false,
            };
          }, 3000);
        },
        (error) => {
          console.error('Error creating post:', error);
          this.showSnackbar(
            'Failed to create post. Please try again.',
            'Dismiss',
            true
          );
          this.isLoading = false;
        }
      );
    } else {
      console.log('Form is invalid or incomplete.');
      this.showSnackbar('Please fill in all required fields.', 'OK', true);
    }
  }

  showSnackbar(
    message: string,
    action: string,
    isError: boolean = false
  ): void {
    console.log('Displaying Snackbar:', message);
    this.snackBar.open(message, action, {
      duration: isError ? 0 : 0, // 0 for errors, 5 seconds for success
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: isError ? 'error-snackbar' : 'success-snackbar',
    });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onFocus(event: Event): void {
    // Optional: Add any additional logic here if needed.
    console.log('Input focused:', event);
  }

// Adjusted to ensure we treat value as Sound
onCheckboxChange(event: Event, value: Sound) {
  const checkbox = event.target as HTMLInputElement;
  const checked = checkbox.checked;

  if (checked) {
    this.post.sound.push(value);
  } else {
    const index = this.post.sound.indexOf(value);
    if (index > -1) {
      this.post.sound.splice(index, 1);
    }
  }
}

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

@HostListener('document:click', ['$event'])
clickOutside(event: Event) {
  if (!this.eRef.nativeElement.contains(event.target)) {
    this.dropdownOpen = false;
  }
}
}
