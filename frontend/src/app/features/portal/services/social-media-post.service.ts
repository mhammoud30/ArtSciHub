import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments/environment';
import { CreateSocialMediaPost } from '../components/social-media-posts/models/create-social-media-post.model';
import { HttpClient } from '@angular/common/http';
import { GetSocialMediaPostModel } from '../components/social-media-posts/models/get-social-media-post.model';

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

  public getSocialMediaPosts() {
    return this.http.get(`${this.socialMediaPostApiUrl}`);
  }

  public getSocialMediaPostById(id: number) {
    return this.http.get(`${this.socialMediaPostApiUrl}/${id}`);
  }
}
