import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, computed, inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { BudgetCategoryDto } from '../../../models/budget-dtos';

@Component({
  selector: 'app-budget-category-chart',
  imports: [ChartModule],
  templateUrl: './budget-category-chart.component.html',
  styleUrl: './budget-category-chart.component.css',
})
export class BudgetCategoryChartComponent implements OnInit {
  public budgetCategories = input<BudgetCategoryDto[]>([]);
  public basicData = computed(() => {
    const labels = this.budgetCategories().map(category => category.entityData.name);
    const data = this.budgetCategories().map(category => category.computedFields.remaining);
    const documentStyle = getComputedStyle(document.documentElement);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Restant',
          data: data,
          backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
          borderColor: documentStyle.getPropertyValue('--p-gray-500'),
        },
      ],
    };
  });
  public basicOptions: unknown;
  private platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.basicOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
              },
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }
}
