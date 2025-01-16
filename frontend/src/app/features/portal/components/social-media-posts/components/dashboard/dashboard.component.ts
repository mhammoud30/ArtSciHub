import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

import { SocialMediaPostService } from '../../../../services/social-media-post.service';
import { BrandService } from '../../../../services/brand.service';
import { Platform } from '../../enums/platform.enum';
import { GetBrandsModel } from '../../../brands/models/get-brands.model';
import { ShortNumberPipe } from '../../../../../../shared/pipes/short-number.pipe';


interface Summary {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalSaves: number;
  avgViews?: number;
  maxViews?: number;
  minViews?: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    ChartModule,
    CardModule,
    CheckboxModule,
    RadioButtonModule,
    ShortNumberPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Filter model
  filter = {
    startDate: null,
    endDate: null,
    brandName: null,
    platform: null,
    groupByBrand: true,
    groupByPlatform: false,
    groupByDate: '' as '' | 'day' | 'week' | 'month' | 'year',
  };

  // For date grouping radio buttons in the sidebar
  dateGroupOptions: Array<'' | 'day' | 'week' | 'month' | 'year'> = [
    'day',
    'week',
    'month',
    'year',
  ];

  // Options for brand dropdown
  brands: GetBrandsModel[] = [];
  filterBrands: any[] = [];
  // For the platform dropdown, add null at the beginning

  platforms = Object.values(Platform);

  // Summaries for radial charts
  radialSummaryData: Array<{
    label: string;
    value: number;
    chartData: any;
    chartOptions: any;
  }> = [];

  // Chart data sets for the template
  multiSeriesLineData: any; // e.g. multiple lines (views, likes, etc.) over time
  stackedBarData: any;      // e.g. stacked bars for brand or platform metrics
  radarChartData: any;      // e.g. brand interactions
  polarAreaData: any;       // e.g. platform or concept distribution
  bubbleChartData: any;     // e.g. performance bubble chart

  // Chart options
  lineChartOptions: any;
  stackedBarChartOptions: any;
  radarChartOptions: any;
  polarAreaChartOptions: any;
  bubbleChartOptions: any;

  // Keep a simpler summary object if needed
  summary: Summary = {
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
    totalSaves: 0,
  };

  constructor(
    private socialMediaPostService: SocialMediaPostService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    // Load brand dropdown
    this.getBrands();

    // Initialize charts with blank or default options
    this.initChartOptions();

    // Load data from backend (all in one shot)
    this.loadEnhancedDashboardData();
  }

  /**
   * Example method to fetch data from an "enhanced" endpoint
   * that returns an object with multiple arrays / aggregates.
   */
  loadEnhancedDashboardData() {
    this.socialMediaPostService.getDashboardData(this.filter).subscribe((res: any) => {
      // 1) Extract summary object from response
      if (res?.summary) {
        this.summary = {
          totalViews: res.summary.totalViews ?? 0,
          totalLikes: res.summary.totalLikes ?? 0,
          totalComments: res.summary.totalComments ?? 0,
          totalShares: res.summary.totalShares ?? 0,
          totalSaves: res.summary.totalSaves ?? 0,
          avgViews: res.summary.avgViews,
          maxViews: res.summary.maxViews,
          minViews: res.summary.minViews
        };
      }


      // 2) Build Multi-Series Line (e.g. from groupByDate)
      if (res?.groupByDate && Array.isArray(res.groupByDate)) {
        this.buildMultiSeriesLineChart(res.groupByDate);
      } else {
        this.multiSeriesLineData = null;
      }

      // 3) Build Stacked Bar (e.g., from groupByBrand or groupByPlatform)
      if (res?.groupByBrand && this.filter.groupByBrand) {
        this.buildStackedBarChart(res.groupByBrand);
      } else if (res?.groupByPlatform && this.filter.groupByPlatform) {
        this.buildStackedBarChart(res.groupByPlatform);
      } else {
        this.stackedBarData = null;
      }

      // 4) Radar Chart (e.g., brand interactions)
      if (res?.groupByBrand && this.filter.groupByBrand) {
        this.buildRadarChart(res.groupByBrand);
      } else {
        this.radarChartData = null;
      }

      // 5) Polar Area Chart (e.g., from groupByPlatform or concept)
      if (res?.groupByPlatform && this.filter.groupByPlatform) {
        this.buildPolarChart(res.groupByPlatform);
      } else {
        this.polarAreaData = null;
      }

      // 6) Bubble Chart (e.g. from topPostsByViews or any other dataset)
      if (res?.topPostsByViews && Array.isArray(res.topPostsByViews)) {
        this.buildBubbleChart(res.topPostsByViews);
      } else {
        this.bubbleChartData = null;
      }
    });
  }


  /**
   * Build a multi-series line chart from groupByDate
   * where each series might be views, likes, etc.
   */
  private buildMultiSeriesLineChart(groupByDate: any[]) {
    // Sort by date
    const sorted = [...groupByDate].sort((a, b) => {
      return new Date(a.groupDate).getTime() - new Date(b.groupDate).getTime();
    });

    const labels = sorted.map(item => item.groupDate.slice(0, 10));
    const dataViews = sorted.map(item => item.totalViews);
    const dataLikes = sorted.map(item => item.totalLikes);

    // Example of 2-line chart: views vs likes
    this.multiSeriesLineData = {
      labels,
      datasets: [
        {
          label: 'Views',
          data: dataViews,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        },
        {
          label: 'Likes',
          data: dataLikes,
          fill: false,
          borderColor: '#66BB6A',
          tension: 0.4
        }
      ]
    };
  }

  /**
   * Build stacked bar chart from brand or platform data
   */
  private buildStackedBarChart(items: any[]) {
    // Example: each item might have brandName or platform + metrics
    const labels = items.map(i => i.brandName || i.platform || 'Unknown');
    const dataViews = items.map(i => i.totalViews);
    const dataLikes = items.map(i => i.totalLikes);
    const dataComments = items.map(i => i.totalComments);

    this.stackedBarData = {
      labels,
      datasets: [
        {
          label: 'Views',
          data: dataViews,
          backgroundColor: '#42A5F5'
        },
        {
          label: 'Likes',
          data: dataLikes,
          backgroundColor: '#66BB6A'
        },
        {
          label: 'Comments',
          data: dataComments,
          backgroundColor: '#FFA726'
        }
      ]
    };
  }

  /**
   * Build a radar chart (e.g., brand interactions)
   */
  private buildRadarChart(items: any[]) {
    const labels = items.map(i => i.brandName || 'Unknown');
    // For instance, total interactions for each brand
    const dataInteractions = items.map(i =>
      i.totalLikes + i.totalComments + i.totalShares + i.totalSaves
    );

    this.radarChartData = {
      labels,
      datasets: [
        {
          label: 'Total Interactions',
          data: dataInteractions,
          backgroundColor: 'rgba(66,165,245,0.2)',
          borderColor: '#42A5F5',
          pointBackgroundColor: '#42A5F5',
          fill: true
        }
      ]
    };
  }

  /**
   * Build a polar area chart from platform or concept data
   */
  private buildPolarChart(items: any[]) {
    // For example, items might have platform + totalViews
    const labels = items.map(i => i.platform || 'Unknown');
    const dataViews = items.map(i => i.totalViews);

    this.polarAreaData = {
      labels,
      datasets: [
        {
          data: dataViews,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EC407A', '#AB47BC']
        }
      ]
    };
  }

  /**
   * Build a bubble chart (e.g., top posts, using metrics for bubble size)
   */
  private buildBubbleChart(topPosts: any[]) {
    // Example: For each post, we'll treat (views, likes) as x,y and comments as bubble size
    // This is purely an example — adapt to your data
    const bubbleData = topPosts.map((post: any) => {
      return {
        x: post.views,
        y: post.likes,
        r: Math.sqrt(post.comments) || 5 // bubble radius
      };
    });

    this.bubbleChartData = {
      datasets: [
        {
          label: 'Posts (Views vs. Likes)',
          data: bubbleData,
          backgroundColor: '#42A5F5'
        }
      ]
    };
  }

  /**
   * Initialize common chart options
   */
  private initChartOptions() {
    // Multi-series line
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: { display: true },
        y: { display: true }
      }
    };

    // Stacked bar
    this.stackedBarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: { stacked: true },
        y: { stacked: true }
      }
    };

    // Radar
    this.radarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' }
      },
      scales: {
        r: {
          angleLines: { color: '#ccc' },
          grid: { color: '#888' }
        }
      }
    };

    // Polar
    this.polarAreaChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: { color: '#888' }
        }
      },
      plugins: {
        legend: { position: 'right' }
      }
    };

    // Bubble
    this.bubbleChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: { display: true, text: 'Views' },
          grid: { color: '#555' }
        },
        y: {
          title: { display: true, text: 'Likes' },
          grid: { color: '#555' }
        }
      },
      plugins: {
        legend: { position: 'top' }
      }
    };
  }

  public resetFilters(): void {
    // Reset filter object to default values
    this.filter = {
      startDate: null,
      endDate: null,
      brandName: null,
      platform: null,
      groupByBrand: true,
      groupByPlatform: false,
      groupByDate: '' as '' | 'day' | 'week' | 'month' | 'year',
    };

    // Optionally reload the data after resetting the filters
    this.loadEnhancedDashboardData();
  }

  /**
   * Load brand dropdown options
   */
  private getBrands(): void {
    this.brandService.getBrands().subscribe((brands: any) => {
      this.brands = brands;
      // map from brands which has name property to an array of all the names
      this.filterBrands = this.brands.map((brand: any) => brand.name);
    });
  }
}
