import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BudgetPlanService } from '../../services/budget-plan.service';
import { forkJoin, Subscription, tap } from 'rxjs';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { BudgetTransactionService } from '../../services/budget-transaction.service';
import { BudgetTransactionTableComponent } from '../../components/tables/budget-transaction-table/budget-transaction-table.component';
import { BudgetPlanTableComponent } from '../../components/tables/budget-plan-table/budget-plan-table.component';
import { BudgetCategoryTableComponent } from '../../components/tables/budget-category-table/budget-category-table.component';
import { Button } from 'primeng/button';
import { BudgetPlanCreateDialogComponent } from '../../components/dialogs/budget-plan-create-dialog/budget-plan-create-dialog.component';
import { BudgetCategoryChartComponent } from '../../components/charts/budget-category-chart/budget-category-chart.component';
import { BudgetCategoryCreateDialogComponent } from '../../components/dialogs/budget-category-create-dialog/budget-category-create-dialog.component';
import { BudgetTransactionCreateDialogComponent } from '../../components/dialogs/budget-transaction-create-dialog/budget-transaction-create-dialog.component';
import { BudgetPlan, BudgetPlanEntityData } from '../../models/budget-plan.models';
import { BudgetCategory, BudgetCategoryEntityData } from '../../models/budget-category.models';
import { BudgetTransaction, BudgetTransactionEntityData } from '../../models/budget-transaction.models';

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
    BudgetTransactionCreateDialogComponent,
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
  public budgetPlans: BudgetPlan[] = [];
  public budgetCategories: BudgetCategory[] = [];
  public budgetTransactions: BudgetTransaction[] = [];

  // State
  public selectedBudgetPlan?: BudgetPlan;

  public ngOnInit(): void {
    this.fetchBudgetPlansSubscription = this.budgetPlanService
      .fetchBudgetPlans()
      .pipe(
        tap(plans => (this.budgetPlans = plans)),
        tap(plans => {
          if (plans.length > 0) {
            this.onBudgetPlanSelect(plans[0]);
          }
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.fetchBudgetPlansSubscription?.unsubscribe();
    this.fetchBudgetCategoriesAndTransactionsSubscription?.unsubscribe();
  }

  public onBudgetPlanSelect(budgetPlan: BudgetPlan): void {
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

  public createBudgetPlan(budgetPlan: BudgetPlanEntityData): void {
    this.budgetPlanService.createBudgetPlan(budgetPlan).subscribe({
      next: (createdBudgetPlan) => {
        console.info('created', createdBudgetPlan);
      },
      error: (error: unknown) => {
        console.error('error', error);
      }
    })
  }

  public editBudgetPlan(budgetPlan: BudgetPlan): void {
    this.budgetPlanService.updateBudgetPlan(budgetPlan.id, budgetPlan.entityData).subscribe({
      next: (editedBudgetPlan) => {
        console.info('edited', editedBudgetPlan);
      },
      error: (error: unknown) => {
        console.error('error', error);
      }
    })
  }

  public createBudgetCategory(budgetCategory: BudgetCategoryEntityData): void {
    console.log('TODO, CREATE', budgetCategory);
  }

  public createBudgetTransaction(budgetTransaction: BudgetTransactionEntityData): void {
    console.log('TODO, CREATE', budgetTransaction);
  }

}
