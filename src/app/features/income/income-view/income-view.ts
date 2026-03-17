import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IncomeService } from '../services/income-service';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-income-view',
  imports: [RouterModule, CurrencyPipe, DatePipe],
  templateUrl: './income-view.html',
  styleUrl: './income-view.scss',
})
export class IncomeView implements OnInit {

  private route = inject(ActivatedRoute);
  private incomeService = inject(IncomeService);
  private toastService = inject(ToastService);

  incomeId!: number;
  income: any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.incomeId = Number(id);
      this.fetchIncome();
    }
  }

  fetchIncome(): void {
    this.incomeService.getById(this.incomeId).subscribe({
      next: (res) => {
        if (res.success) {
          this.income = res.data;
        } else {
          this.toastService.error('Failed to load income');
        }
      },
      error: (err) => this.toastService.error('API Error', err)
    });
  }
}
