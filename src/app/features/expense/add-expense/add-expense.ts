import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { ExpenseService } from '../services/expense-service';
import { ExpenseRequest } from '../expense';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.scss',
})
export class AddExpense {

  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private expenseService = inject(ExpenseService);
  private router = inject(Router);
  submitted=false;
  loading = false;
  addForm = this.fb.group({
    title:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
    description:['',[Validators.minLength(6),Validators.maxLength(500)]],
    amount:[0,[Validators.required,Validators.min(0)]],
    category:['',[Validators.required,Validators.min(3)]]
  });

  onSubmit():void{
    this.submitted=true;
    if(this.addForm.invalid){
      this.toastService.warning("Please fill all required fields");
      return;
    }
    this.loading=true;

    const payload: ExpenseRequest = {
      title: this.addForm.value.title ?? '',
      amount: this.addForm.value.amount ?? 0,
      category: this.addForm.value.category ?? '',
      description: this.addForm.value.description ?? undefined
    };
    this.expenseService.createExpense(payload).subscribe({
      next:(response)=>{
        console.log("Success! ",response);
        this.toastService.success("Expense Added Succuessfully!");
        this.loading=false;
        this.router.navigate(['/expenses']);
      },
      error:(err)=>{
        this.toastService.error(err,"Operation Failed");
        this.loading=false;
      }
    });
  }
  get f(){
    return this.addForm.controls;
  }
}
