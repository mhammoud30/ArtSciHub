import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandModel } from '../components/brands/models/create-brand-model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private http : HttpClient,
  ) { }

  public createBrand(brand: BrandModel) {
    return this.http.post('http://localhost:3000/brands', brand);
  }

  public getBrands() {
    return this.http.get('http://localhost:3000/brands');
  }
}
