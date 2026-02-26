import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { ExpenseService } from '../services/expense-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseRequest } from '../expense';

@Component({
  selector: 'app-edit-expense',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-expense.html',
  styleUrl: './edit-expense.scss',
})
export class EditExpense implements OnInit{

  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private expenseService = inject(ExpenseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  submitted = false;
  loading = false;
  expenseId!:number;
  editForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.minLength(6), Validators.maxLength(500)]],
    amount: [0, [Validators.required, Validators.min(0)]],
    category: ['', [Validators.required, Validators.min(3)]]
  });
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.expenseId = Number(id);
      this.fetchExpenseData();
    }
  }

  fetchExpenseData(): void {
    this.expenseService.getExpenseById(this.expenseId).subscribe({
      next: (response) => {
        if (response.success) {
          this.editForm.patchValue(response.data);
        } else {
          this.toastService.error("Could not load expense data");
        }
      },
      error: (err) => this.toastService.error("API Error", err)
    });
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.editForm.invalid) {
      this.toastService.warning("Please fill all required fields");
      return;
    }
    this.loading = true;

    const payload: ExpenseRequest = {
      title: this.editForm.value.title ?? '',
      amount: this.editForm.value.amount ?? 0,
      category: this.editForm.value.category ?? '',
      description: this.editForm.value.description ?? undefined
    };
    this.expenseService.updateExpenseById(this.expenseId,payload).subscribe({
      next: (response) => {
        console.log("Success! ", response);
        this.toastService.success("Expense Updated Succuessfully!");
        this.loading = false;
        this.router.navigate(['/expenses']);
      },
      error: (err) => {
        this.toastService.error(err, "Operation Failed");
        this.loading = false;
      }
    });
  }
  get f() {
    return this.editForm.controls;
  }
}
