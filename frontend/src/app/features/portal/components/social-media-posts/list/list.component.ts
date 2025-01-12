import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SocialMediaPostService } from '../../../services/social-media-post.service';
import { GetPaginatedPostsModel } from '../models/get-paginated-post.model';
import { GetSocialMediaPostModel } from '../models/get-social-media-post.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, PaginatorModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  posts!: GetPaginatedPostsModel;
  errorMessage = '';

  // Define default values for pagination
  currentPage = 1;      // 1-based page index
  itemsPerPage = 25;
  totalPages = 1;
  totalItems = 0;

  // If you have a dropdown for items per page
  pageSizeOptions = [1, 5, 10, 25, 50];

  selectedPost?: GetSocialMediaPostModel;

  constructor(private socialMediaPostService: SocialMediaPostService) {}

  ngOnInit() {
    // Initial load
    this.getPosts(this.itemsPerPage, this.currentPage);
  }

  // Updated signature: getPosts(page, limit)
  getPosts(limit: number, page: number): void {
    this.socialMediaPostService.getSocialMediaPosts(limit, page).subscribe(
      (response: GetPaginatedPostsModel) => {
        this.posts = response;
        this.currentPage = response.meta.currentPage;
        this.itemsPerPage = response.meta.itemsPerPage;
        this.totalItems = response.meta.totalItems;
        this.totalPages = response.meta.totalPages;
      },
      (error) => {
        console.error('Error fetching posts:', error);
        this.errorMessage = 'Could not load posts. Please try again later.';
      }
    );
  }

  selectPost(id: number): void {
    window.open(`/portal/social-media-posts/view/${id}`, '_blank');
  }

  onItemsPerPageChange() {
    // Reset to first page whenever the limit changes
    this.currentPage = 1;
    this.getPosts(this.itemsPerPage, this.currentPage);
  }

  // PrimeNG onPage event handler
  onPageChange(event: any): void {
    /**
     * event.page is 0-based index, so for a 1-based API we add 1.
     * event.rows is how many rows per page the user selected in the UI.
     */
    this.currentPage = this.currentPage = event.first / event.rows + 1;
    this.itemsPerPage = event.rows;
    console.log('Page change:', this.currentPage, this.itemsPerPage);
    console.log('Event:', event);
    this.getPosts(this.itemsPerPage, this.currentPage);
  }
}
