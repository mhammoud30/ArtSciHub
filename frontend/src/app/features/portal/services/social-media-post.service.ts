import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments/environment.development';
import { CreateSocialMediaPost } from '../components/social-media-posts/models/create-social-media-post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaPostService {

  constructor(
    private http: HttpClient,
  ) { }

  socialMediaPostApiUrl = environment.API_URL + '/social-media-posts';

  public createSocialMediaPost(socialMediaPost: CreateSocialMediaPost) {
    return this.http.post(`${this.socialMediaPostApiUrl}`, socialMediaPost);
  }
}
