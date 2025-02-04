import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BudgetPlanService } from '../../services/budget-plan.service';
import { Subscription, tap } from 'rxjs';
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
import { ToastService } from '../../services/toast.service';
import { BudgetPlanAggregateService } from '../../services/budget-plan-aggregate.service';

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
  private readonly toastService: ToastService = inject(ToastService);
  private readonly budgetPlanAggregateService: BudgetPlanAggregateService = inject(BudgetPlanAggregateService);
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

    this.budgetPlanAggregateService
      .fetchBudgetPlanAggregate(budgetPlan.id)
      .pipe(
        tap(aggregate => {
          this.budgetCategories = aggregate.categories;
          this.budgetTransactions = aggregate.transactions;
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
      next: createdBudgetPlan => {
        this.toastService.success(
          `Création du budget ${createdBudgetPlan.data.startDate.toLocaleDateString()}`,
          'Création réussie'
        );
      },
      complete: () => {
        this.showBudgetPlanDialog = false;
      }
    });
  }

  public editBudgetPlan(budgetPlan: BudgetPlan): void {
    this.budgetPlanService.updateBudgetPlan(budgetPlan.id, budgetPlan.data).subscribe(editedBudgetPlan => {
      this.toastService.success(
        `Modification du budget ${editedBudgetPlan.data.startDate.toLocaleDateString()}`,
        'Modification réussie'
      );
    });
  }

  public createBudgetCategory(budgetCategory: BudgetCategoryEntityData): void {
    this.budgetCategoryService.createBudgetCategory(budgetCategory).subscribe({
      next: createdBudgetCategory => {
        this.toastService.success(`Création de la catégorie ${createdBudgetCategory.data.name}`, 'Création réussie');
      },
      complete: () => {
        this.showBudgetCategoryDialog = false;
      }
    });
  }

  public editBudgetCategory(budgetCategory: BudgetCategory): void {
    this.budgetCategoryService
      .updateBudgetCategory(budgetCategory.id, budgetCategory.data)
      .subscribe(editedBudgetCategory => {
        this.toastService.success(
          `Modification de la catégorie ${editedBudgetCategory.data.name}`,
          'Modification réussie'
        );
      });
  }

  public createBudgetTransaction(budgetTransaction: BudgetTransactionEntityData): void {
    this.budgetTransactionService.createBudgetCategory(budgetTransaction).subscribe({
      next: createdBudgetTransaction => {
        this.toastService.success(
          `Création de la transaction ${createdBudgetTransaction.data.description}`,
          'Création réussie'
        );
      },
      complete: () => {
        this.showBudgetTransactionDialog = false;
      }
    });
  }

  public editBudgetTransaction(budgetTransaction: BudgetTransaction): void {
    this.budgetTransactionService
      .updateBudgetTransaction(budgetTransaction.id, budgetTransaction.data)
      .subscribe(editedBudgetTransaction => {
        this.toastService.success(
          `Modification de la transaction ${editedBudgetTransaction.data.description}`,
          'Modification réussie'
        );
      });
  }
}
