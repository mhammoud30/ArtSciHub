import { Component } from '@angular/core';
import { CreateComponent } from "./create/create.component";
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CreateComponent, ListComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

}
