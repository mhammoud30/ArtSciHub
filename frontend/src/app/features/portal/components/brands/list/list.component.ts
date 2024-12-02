import { Component } from '@angular/core';
import { BrandModel } from '../models/create-brand.model';
import { BrandService } from '../../../services/brand.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  brands: BrandModel[] = [];
  errorMessage: string = '';

  constructor(
    private brandService : BrandService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe(
      (response: any) => {
        console.log('Brands:', response);
        this.brands = response;
      },
      (error) => {
        console.error('Error fetching brands:', error);
        this.errorMessage = 'Could not load brands. Please try again later.';
      }
    );
  }

}
