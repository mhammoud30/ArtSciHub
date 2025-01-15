import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { SocialMediaPostService } from '../../../../services/social-media-post.service';
import { Platform } from '../../enums/platform.enum';
import { BrandService } from '../../../../services/brand.service';
import { GetBrandsModel } from '../../../brands/models/get-brands.model';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';

interface DashboardRow {
  brandName?: string;
  platform?: string;
  groupDate?: string;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalSaves: number;
  postCount: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    ChartModule,
    TableModule,
    CardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
// Filter model
filter = {
  startDate: null,
  endDate: null,
  brandName: null,
  platform: null,
  groupByBrand: false,
  groupByPlatform: false,
  groupByDate: '' as '' | 'day' | 'week' | 'month' | 'year',
};

// Options for dropdowns
brands: GetBrandsModel[] = [];
filterBrands : { label: string; value: number }[] = [];
// fill the filter dropdown from the Platform enum
platforms = Object.values(Platform);

// Data holders
dashboardRows: DashboardRow[] = [];
summary = {
  totalViews: 0,
  totalLikes: 0,
  totalComments: 0,
  totalShares: 0,
  totalSaves: 0
};

barChartData: any;
pieChartData: any;
lineChartData: any;

constructor(private socialMediaPostService: SocialMediaPostService, private brandService: BrandService) {}

ngOnInit(): void {
  // Load brands
  this.getBrands();
  // Load initial data
  this.loadDashboardData();
}

loadDashboardData() {
  this.socialMediaPostService.getDashboardData(this.filter).subscribe((res : any) => {
    console.log(res);
    // 1) Store raw rows
    this.dashboardRows = res;

    // 2) Summarize overall metrics
    this.calculateSummary(res);

    // 3) Build chart data
    this.buildCharts(res);
  });
}

private getBrands(): void {
  this.brandService.getBrands().subscribe((brands : any) => {
    this.brands = brands;

  this.filterBrands = this.brands.map((brand) => {
    return {
      label: brand.name,
      value: brand.id
    };
  });
  });

}

private calculateSummary(rows: DashboardRow[]): void {
  let totalViews = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalShares = 0;
  let totalSaves = 0;

  rows.forEach((row) => {
    totalViews += row.totalViews;
    totalLikes += row.totalLikes;
    totalComments += row.totalComments;
    totalShares += row.totalShares;
    totalSaves += row.totalSaves;
  });

  this.summary = {
    totalViews,
    totalLikes,
    totalComments,
    totalShares,
    totalSaves
  };
}

private buildCharts(rows: DashboardRow[]): void {
  // 1. Bar Chart (e.g., if groupByBrand is checked)
  if (this.filter.groupByBrand) {
    const labels: string[] = [];
    const dataViews: number[] = [];

    rows.forEach((row) => {
      if (row.brandName) {
        labels.push(row.brandName);
        dataViews.push(row.totalViews);
      }
    });

    this.barChartData = {
      labels,
      datasets: [
        {
          label: 'Views',
          data: dataViews,
          backgroundColor: '#42A5F5'
        }
      ]
    };
  } else {
    this.barChartData = null;
  }

  // 2. Pie Chart (e.g., if groupByPlatform is checked)
  if (this.filter.groupByPlatform) {
    const platformMap: Record<string, number> = {};

    rows.forEach((row) => {
      if (row.platform) {
        platformMap[row.platform] = (platformMap[row.platform] || 0) + row.totalViews;
      }
    });
    const labels = Object.keys(platformMap);
    const data = Object.values(platformMap);

    this.pieChartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EC407A']
        }
      ]
    };
  } else {
    this.pieChartData = null;
  }

  // 3. Line Chart for date grouping
  if (this.filter.groupByDate) {
    // Sort rows by groupDate for a proper timeline
    const sortedRows = [...rows].sort((a, b) => {
      return new Date(a.groupDate!).getTime() - new Date(b.groupDate!).getTime();
    });

    const labels = sortedRows.map((row) => row.groupDate);
    const dataViews = sortedRows.map((row) => row.totalViews);

    this.lineChartData = {
      labels,
      datasets: [
        {
          label: 'Views Over Time',
          data: dataViews,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        }
      ]
    };
  } else {
    this.lineChartData = null;
  }
}
}
