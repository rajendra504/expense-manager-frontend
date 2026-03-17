import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncomeService } from '../services/income-service';
import { ToastService } from '../../../core/services/toast-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-income-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, CurrencyPipe, DatePipe],
  templateUrl: './income-list.html',
  styleUrl: './income-list.scss',
})
export class IncomeList implements OnInit {

  private fb = inject(FormBuilder);
  private incomeService = inject(IncomeService);
  private toastService = inject(ToastService);
  private modalService = inject(NgbModal);

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  selectedId!: number;
  incomes: any[] = [];

  page = 0;
  size = 6;
  totalPages = 0;
  sort = 'id,desc';
  searchTerm = '';

  filterForm = this.fb.group({
    minAmount: [''],
    maxAmount: ['']
  });

  ngOnInit() { this.loadIncomes(); }

  loadIncomes() {
    const params: any = { page: this.page, size: this.size, sort: this.sort };
    if (this.searchTerm) params.search = this.searchTerm;
    const f = this.filterForm.value;
    if (f.minAmount) params.minAmount = f.minAmount;
    if (f.maxAmount) params.maxAmount = f.maxAmount;

    this.incomeService.getAll(params).subscribe(res => {
      if (res.success) {
        this.incomes = res.data.content;
        this.totalPages = res.data.totalPages;
      } else {
        this.toastService.error(res.message);
      }
    });
  }

  onSearch() { this.page = 0; this.loadIncomes(); }

  onSort(column: string) {
    const direction = this.sort.includes('asc') ? 'desc' : 'asc';
    this.sort = `${column},${direction}`;
    this.loadIncomes();
  }

  changePage(newPage: number) { this.page = newPage; this.loadIncomes(); }
  applyFilters() { this.page = 0; this.loadIncomes(); }

  resetFilters() {
    this.filterForm.reset({ minAmount: '', maxAmount: '' });
    this.searchTerm = '';
    this.loadIncomes();
  }

  onDelete(id: number) {
    this.selectedId = id;
    this.modalService.open(this.deleteModal);
  }

  confirmDelete(modal: any) {
    this.incomeService.delete(this.selectedId).subscribe({
      next: () => {
        this.toastService.success('Deleted successfully');
        modal.close();
        this.loadIncomes();
      },
      error: () => this.toastService.error('Delete failed')
    });
  }

}
