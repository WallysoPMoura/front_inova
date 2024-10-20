import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasePaginateResponse } from '../../../@core/types/base-response.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'inova-paginate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.scss'
})
export class PaginateComponent {

  @Input() pagination!: BasePaginateResponse<any> | undefined | null;
  @Output() pageChange = new EventEmitter<number>();

  ngOnChanges(): void {
  }

  get currentPage() {
    return this.pagination?.data?.page || 1;
  }

  get maxPage() {
    return Math.ceil(((this.pagination?.data?.total || 0) / (this.pagination?.data?.perPage || 1))) || 1;
  }

  get pages() {
    return this.abbreviatePages(this.currentPage, this.maxPage, 4);
  }

  changePage(label: string | number): void {
    const page = Number(label);

    if (this.currentPage === page || page < 1 || page > this.maxPage) {
      return;
    }

    this.pageChange.emit(page);
  }

  next() {
    if (this.currentPage < this.maxPage) {
      this.changePage(this.currentPage + 1);
    }
  }

  previous() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  abbreviatePages(currentPage: number, maxPage: number, maxPagesToShow: number) {
    const abbreviatedPages = [];

    if (maxPage <= maxPagesToShow) {
      for (let i = 1; i <= maxPage; i++) {
        abbreviatedPages.push({
          label: i.toString(),
          active: i === currentPage,
        });
      }
      return abbreviatedPages;
    }

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(maxPage, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      abbreviatedPages.push({
        label: "1",
        active: false,
      });

      if (startPage > 2) {
        abbreviatedPages.push({
          label: "...",
          active: false,
        });
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      abbreviatedPages.push({
        label: i.toString(),
        active: i === currentPage,
      });
    }

    if (endPage < maxPage) {
      if (endPage < maxPage - 1) {
        abbreviatedPages.push({
          label: "...",
          active: false,
        });
      }

      abbreviatedPages.push({
        label: maxPage.toString(),
        active: false,
      });
    }

    return abbreviatedPages;
  }

}
