import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomeService } from '../services/income-service';
import { ToastService } from '../../../core/services/toast-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-income-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './income-form.html',
  styleUrl: './income-form.scss',
})
export class IncomeForm implements OnInit {

  private fb = inject(FormBuilder);
  private incomeService = inject(IncomeService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = false;
  incomeId!: number;
  isSubmitting = false;

  form = this.fb.group({
    source: ['', Validators.required],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    date: ['', Validators.required],
    description: ['']
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.incomeId = +id;
      this.incomeService.getById(this.incomeId).subscribe(res => {
        if (res.success) {
          const d = res.data;
          this.form.patchValue({
            source: d.source,
            amount: d.amount,
            date: d.date,
            description: d.description ?? ''
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isSubmitting = true;
    const payload = this.form.value as any;

    const request$ = this.isEditMode
      ? this.incomeService.update(this.incomeId, payload)
      : this.incomeService.create(payload);

    request$.subscribe({
      next: () => {
        this.toastService.success(this.isEditMode ? 'Income updated!' : 'Income added!');
        this.router.navigate(['/income']);
      },
      error: () => {
        this.toastService.error('Something went wrong');
        this.isSubmitting = false;
      }
    });
  }
}
