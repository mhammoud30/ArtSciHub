import { Component } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { BrandModel } from '../models/create-brand.model';
import { Vertical } from '../enums/vertical.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-brand',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {

  brand: BrandModel = {
    name: '',
    vertical: Vertical.FASHION,
  };
  verticals: string[] = Object.values(Vertical);
  message: string = '';

  constructor(private brandService: BrandService) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.brandService.createBrand(this.brand).subscribe(
        (response) => {
          this.message = 'Brand created successfully!';
          form.reset();
        },
        (error) => {
          console.error('Error creating brand:', error);
          this.message = 'Failed to create brand. Please try again.';
        }
      );
    }
  }
}
