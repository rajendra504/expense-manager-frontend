import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IncomeService } from '../income/services/income-service';
import { ExpenseService } from '../expense/services/expense-service';
import { FinancialSummaryResponse, MonthlySummaryResponse } from '../income/income.model';
import { Chart, registerables } from 'chart.js';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {

  private incomeService = inject(IncomeService);
  private expenseService = inject(ExpenseService);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('donutChart') donutChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;

  monthlySummary: MonthlySummaryResponse[] = [];
  selectedMonths = 6;
  private lineChart?: Chart;
  summary: FinancialSummaryResponse | null = null;
  categoryTotals: { category: string; total: number }[] = [];
  isLoading = true;
  chartsReady = false;

  private donutChart?: Chart;
  private barChart?: Chart;

  ngOnInit() {
    this.loadMonthlySummary();
    this.incomeService.getSummary().subscribe(res => {
      if (res.success) {
        this.summary = res.data;
        this.isLoading = false;
        this.cdr.detectChanges(); // force @if(summary) to render canvases NOW
        setTimeout(() => this.renderDonut(), 0); // then render after DOM updates
      }
    });

    this.expenseService.getAll({ page: 0, size: 200, sort: 'id,desc' }).subscribe(res => {
      if (res.success) {
        const map = new Map<string, number>();
        for (const exp of res.data.content) {
          map.set(exp.category, (map.get(exp.category) ?? 0) + Number(exp.amount));
        }
        this.categoryTotals = Array.from(map.entries())
          .map(([category, total]) => ({ category, total }))
          .sort((a, b) => b.total - a.total);

        this.chartsReady = true;
        this.cdr.detectChanges();
        setTimeout(() => this.renderBar(), 0);
      }
    });
  }

  private renderDonut() {
    const canvas = this.donutChartRef?.nativeElement;
    if (!canvas || !this.summary) return;

    this.donutChart?.destroy();
    this.donutChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
          data: [
            Number(this.summary.totalIncome),
            Number(this.summary.totalExpense)
          ],
          backgroundColor: [
            'rgba(45, 212, 160, 0.75)',
            'rgba(224, 92, 92, 0.75)'
          ],
          borderColor: ['#2dd4a0', '#e05c5c'],
          borderWidth: 2,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'rgba(255,255,255,0.6)',
              padding: 16,
              font: { size: 12 },
              usePointStyle: true,
              pointStyleWidth: 8
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ₹${Number(ctx.parsed).toLocaleString('en-IN')}`
            }
          }
        }
      }
    });
  }

  private renderBar() {
    const canvas = this.barChartRef?.nativeElement;
    if (!canvas || this.categoryTotals.length === 0) return;

    this.barChart?.destroy();
    this.barChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.categoryTotals.map(c => c.category),
        datasets: [{
          label: 'Amount (₹)',
          data: this.categoryTotals.map(c => c.total),
          backgroundColor: 'rgba(201, 168, 76, 0.25)',
          borderColor: '#c9a84c',
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ₹${Number(ctx.parsed.y).toLocaleString('en-IN')}`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 11 } },
            grid: { color: 'rgba(255,255,255,0.05)' }
          },
          y: {
            ticks: {
              color: 'rgba(255,255,255,0.5)',
              font: { size: 11 },
              callback: (val) => '₹' + Number(val).toLocaleString('en-IN')
            },
            grid: { color: 'rgba(255,255,255,0.06)' }
          }
        }
      }
    });
  }



loadMonthlySummary(months: number = 6) {
  this.incomeService.getMonthlySummary(months).subscribe(res => {
    if (res.success) {
      this.monthlySummary = res.data;
      this.cdr.detectChanges();
      setTimeout(() => this.renderLineChart(), 0);
    }
  });
}

onMonthsChange(months: number) {
  this.selectedMonths = months;
  this.lineChart?.destroy();
  this.loadMonthlySummary(months);
}

private renderLineChart() {
  const canvas = this.lineChartRef?.nativeElement;
  if (!canvas || this.monthlySummary.length === 0) return;

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const labels = this.monthlySummary.map(
    m => `${monthNames[m.month - 1]} ${m.year}`
  );

  this.lineChart?.destroy();
  this.lineChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Income',
          data: this.monthlySummary.map(m => Number(m.totalIncome)),
          borderColor: '#2dd4a0',
          backgroundColor: 'rgba(45, 212, 160, 0.08)',
          borderWidth: 2,
          pointBackgroundColor: '#2dd4a0',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
          fill: true
        },
        {
          label: 'Expenses',
          data: this.monthlySummary.map(m => Number(m.totalExpense)),
          borderColor: '#e05c5c',
          backgroundColor: 'rgba(224, 92, 92, 0.08)',
          borderWidth: 2,
          pointBackgroundColor: '#e05c5c',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'rgba(255,255,255,0.6)',
            usePointStyle: true,
            pointStyleWidth: 8,
            font: { size: 12 }
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              ` ${ctx.dataset.label}: ₹${Number(ctx.parsed.y).toLocaleString('en-IN')}`
          }
        }
      },
      scales: {
        x: {
          ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 11 } },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          ticks: {
            color: 'rgba(255,255,255,0.5)',
            font: { size: 11 },
            callback: (val) => '₹' + Number(val).toLocaleString('en-IN')
          },
          grid: { color: 'rgba(255,255,255,0.06)' }
        }
      }
    }
  });
}
  ngOnDestroy() {
    this.donutChart?.destroy();
    this.barChart?.destroy();
    this.lineChart?.destroy();
  }
}
