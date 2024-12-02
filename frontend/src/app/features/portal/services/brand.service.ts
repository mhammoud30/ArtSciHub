import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBrandModel } from '../components/brands/models/create-brand.model';
import { environment } from '../../../core/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private http : HttpClient,
  ) { }

  brandApiUrl = environment.API_URL + '/brands';

  public createBrand(brand: CreateBrandModel) {
    return this.http.post(`${this.brandApiUrl}`, brand);
  }

  public getBrands() {
    return this.http.get(`${this.brandApiUrl}`);
  }
}
