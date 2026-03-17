import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ExpenseService } from '../services/expense-service';
import { ToastService } from '../../../core/services/toast-service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-expense',
  imports: [RouterModule, CurrencyPipe,DatePipe,],
  templateUrl: './view-expense.html',
  styleUrl: './view-expense.scss',
})
export class ViewExpense implements OnInit {

  private route = inject(ActivatedRoute);
  private expenseService = inject(ExpenseService);
  private toastService = inject(ToastService);

  expenseId!: number;
  expense: any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.expenseId = Number(id);
      this.fetchExpense();
    }
  }

  fetchExpense(): void {
    this.expenseService.getExpenseById(this.expenseId).subscribe({
      next: (res) => {
        if (res.success) {
          this.expense = res.data;
        } else {
          this.toastService.error("Failed to load expense");
        }
      },
      error: (err) => this.toastService.error("API Error", err)
    });
  }
}
