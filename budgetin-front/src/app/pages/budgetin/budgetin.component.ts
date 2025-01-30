import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BudgetCategoryDto, BudgetPlanDto, BudgetTransactionDto } from '../../models/budget-dtos';
import { BudgetPlanService } from '../../services/budget-plan.service';
import { forkJoin, Subscription, tap } from 'rxjs';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { BudgetTransactionService } from '../../services/budget-transaction.service';
import { BudgetTransactionTableComponent } from '../../components/tables/budget-transaction-table/budget-transaction-table.component';
import { BudgetPlanTableComponent } from '../../components/tables/budget-plan-table/budget-plan-table.component';
import { BudgetCategoryTableComponent } from '../../components/tables/budget-category-table/budget-category-table.component';
import { Button } from 'primeng/button';
import { BudgetPlanCreateDialogComponent } from '../../components/dialogs/budget-plan-create-dialog/budget-plan-create-dialog.component';
import { BudgetCategory, BudgetPlan } from '../../models/budget-entities';
import { BudgetCategoryChartComponent } from '../../components/charts/budget-category-chart/budget-category-chart.component';
import {
  BudgetCategoryCreateDialogComponent
} from '../../components/dialogs/budget-category-create-dialog/budget-category-create-dialog.component';

@Component({
  selector: 'app-budgetin',
  imports: [
    BudgetTransactionTableComponent,
    BudgetPlanTableComponent,
    BudgetCategoryTableComponent,
    Button,
    BudgetPlanCreateDialogComponent,
    BudgetCategoryChartComponent,
    BudgetCategoryCreateDialogComponent,
  ],
  templateUrl: './budgetin.component.html',
  styleUrl: './budgetin.component.css',
})
export class BudgetinComponent implements OnInit, OnDestroy {
  // Injections
  private readonly budgetPlanService: BudgetPlanService = inject(BudgetPlanService);
  private readonly budgetCategoryService: BudgetCategoryService = inject(BudgetCategoryService);
  private readonly budgetTransactionService: BudgetTransactionService = inject(BudgetTransactionService);

  // Subscriptions
  private fetchBudgetPlansSubscription?: Subscription;
  private fetchBudgetCategoriesAndTransactionsSubscription?: Subscription;

  // Dialogs
  public showBudgetPlanDialog = false;
  public showBudgetCategoryDialog = false;
  public showBudgetTransactionDialog = false;

  // Data
  public budgetPlans: BudgetPlanDto[] = [];
  public budgetCategories: BudgetCategoryDto[] = [];
  public budgetTransactions: BudgetTransactionDto[] = [];

  // State
  public selectedBudgetPlan?: BudgetPlanDto;

  public ngOnInit(): void {
    this.fetchBudgetPlansSubscription = this.budgetPlanService
      .fetchBudgetPlans()
      .pipe(tap(plans => (this.budgetPlans = plans)))
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.fetchBudgetPlansSubscription?.unsubscribe();
    this.fetchBudgetCategoriesAndTransactionsSubscription?.unsubscribe();
  }

  public onBudgetPlanSelect(budgetPlan: BudgetPlanDto): void {
    this.selectedBudgetPlan = budgetPlan;
    this.fetchBudgetCategoriesAndTransactionsSubscription = forkJoin({
      categories: this.budgetCategoryService.fetchBudgetCategoriesByBudgetPlanId(budgetPlan.id),
      transactions: this.budgetTransactionService.fetchTransactionsByBudgetPlanId(budgetPlan.id),
    })
      .pipe(
        tap(({ categories, transactions }) => {
          this.budgetCategories = categories;
          this.budgetTransactions = transactions;
        })
      )
      .subscribe();
  }

  public onBudgetPlanUnselect(): void {
    this.budgetCategories = [];
    this.budgetTransactions = [];
  }

  public createBudgetPlan(budgetPlan: BudgetPlan): void {
    console.log('TODO, CREATE', budgetPlan);
  }

  public createBudgetCategory(budgetCategory: BudgetCategory): void {
    console.log('TODO, CREATE', budgetCategory);
  }
}
