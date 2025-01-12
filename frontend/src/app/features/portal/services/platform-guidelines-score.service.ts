import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatformGuidelinesScoreService {

  constructor(
    private http : HttpClient,
  ) { }

  platformGuidelinesScoreApiUrl = environment.API_URL

  public createYoutubeGuidelinesScore(youtubeGuidelinesScore: any) {
    return this.http.post(`${this.platformGuidelinesScoreApiUrl}/youtube-guidelines-scores`, youtubeGuidelinesScore);
  }

  public createTiktokGuidelinesScore(tiktokGuidelinesScore: any) {
    return this.http.post(`${this.platformGuidelinesScoreApiUrl}/tiktok-guidelines-scores`, tiktokGuidelinesScore);
  }

  public createInstagramGuidelinesScore(instagramGuidelinesScore: any) {
    return this.http.post(`${this.platformGuidelinesScoreApiUrl}/instagram-guidelines-scores`, instagramGuidelinesScore);
  }

  public createFacebookGuidelinesScore(facebookGuidelinesScore: any) {
    return this.http.post(`${this.platformGuidelinesScoreApiUrl}/facebook-guidelines-scores`, facebookGuidelinesScore);
  }
}
