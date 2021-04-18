import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input('totalItems') totalItems: number = 0;
  @Input('itemsPerPage') itemsPerPage: number = 0;
  @Output('onPageChange')
  onPageChange: EventEmitter<number> = new EventEmitter();

  totalPages: number = 0;
  pages: any[] = [];
  selectedPage: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.totalPages > 0) {
      if (this.totalPages === 1) {
        this.pages = [0];
      } else if (this.totalPages === 2) {
        this.pages = [0, 1];
      } else if (this.totalPages === 3) {
        this.pages = [0, 1, 2];
      } else if (this.totalPages === 4) {
        this.pages = [0, 1, 2, 3];
      } else {
        this.pages = [0, 1, 2, 3, 4];
      }
    } else {
      this.pages = [];
    }
  }

  goToPage(page: number): void {
    if (page === this.selectedPage) return;
    this.onPageChange.emit(page);
    this.selectedPage = page;
    if (page === this.pages[4]) this.next();
    if (page === this.pages[0]) this.previous();
  }

  next(): void {
    if (!this.disableNextButton())
      this.pages = this.pages.map((page) => {
        if (this.pages.indexOf(page)<5) {
          return page+1;
        }
        return page
      });
  }
  
  disableNextButton(): boolean {
    return (
      this.pages.length === 0 ||
      this.selectedPage >= this.totalPages - 1
    );
  }

  previous(): void {
    if (this.pages[0] > 0) {
      this.pages = this.pages.map((page) => { 
        if (this.pages.indexOf(page)<5) {
          return page-1;
        }
        return page;
      });
    }
  }

  disablePreviousButton(): boolean {
    return this.pages.length === 0 || this.pages[0] === 0;
  }
}
