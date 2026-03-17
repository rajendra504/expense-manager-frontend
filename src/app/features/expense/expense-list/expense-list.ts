import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ExpenseService } from '../services/expense-service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss',
})
export class ExpenseList implements OnInit{

  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);
  private toastService = inject(ToastService);
  private modalService = inject(NgbModal);

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  selectedId!: number;
  expenses: any[] = [];
  categories: string[] = [];

  page = 0;
  size = 6;
  totalPages = 0;
  sort = 'id,desc';

  searchTerm = '';

  filterForm = this.fb.group({
    category: [''],
    minAmount: [''],
    maxAmount: ['']
  });


  ngOnInit() {
    this.loadExpenses();
    this.loadCategories();
  }
  loadCategories() {
    this.expenseService.getCategories().subscribe(res => {
      if (res.success) {
        this.categories = res.data;
      }
    });
  }
  loadExpenses() {
    const params: any = {
      page: this.page,
      size: this.size,
      sort: this.sort
    };

    if (this.searchTerm) {
      params.search = this.searchTerm;
    }

    const filters = this.filterForm.value;

    if (filters.category) params.category = filters.category;
    if (filters.minAmount) params.minAmount = filters.minAmount;
    if (filters.maxAmount) params.maxAmount = filters.maxAmount;

    this.expenseService.getAll(params).subscribe(res => {
      if (res.success) {
        this.expenses = res.data.content;
        this.totalPages = res.data.totalPages;
      } else {
        this.toastService.error(res.message);
      }
    });
  }

  onSearch() {
    this.page = 0;
    this.loadExpenses();
  }

  onSort(column: string) {
    const direction = this.sort.includes('asc') ? 'desc' : 'asc';
    this.sort = `${column},${direction}`;
    this.loadExpenses();
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.loadExpenses();
  }

  applyFilters() {
    this.page = 0;
    this.loadExpenses();
  }

  resetFilters() {
    this.filterForm.reset({
      category: '',
      minAmount: '',
      maxAmount: ''
    });
    this.searchTerm = '';
    this.loadExpenses();
  }
  openDeleteModal(id: number) {
    this.selectedId = id;
    this.modalService.open(this.deleteModal);
  }

  confirmDelete(modal: any) {
    this.expenseService.deleteExpenseById(this.selectedId).subscribe({
      next: () => {
        this.toastService.success("Deleted successfully");
        modal.close();
        this.loadExpenses(); // ✅ HERE
      },
      error: () => this.toastService.error("Delete failed")
    });
  }
  onDelete(id: number): void {
    this.openDeleteModal(id);
  }
  // resetFilters() {
  //   this.filterForm.reset();
  //   this.searchTerm = '';
  //   this.loadExpenses();
  // }

}
