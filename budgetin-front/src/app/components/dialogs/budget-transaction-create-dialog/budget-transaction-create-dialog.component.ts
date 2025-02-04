import { Component, computed, effect, input, model, OnDestroy, output, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Fluid } from 'primeng/fluid';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { buildCategoriesSelectables } from '../../../models/budget-selectables';
import { DatePicker } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { MoneyTagComponent } from '../../../../shared/components/text/money-tag/money-tag.component';
import { BudgetCategory } from '../../../models/budget-category.models';
import { BudgetTransactionEntityData, BudgetTransactionStatuses } from '../../../models/budget-transaction.models';

@Component({
  selector: 'app-budget-transaction-create-dialog',
  imports: [
    Dialog,
    FormsModule,
    Button,
    Fluid,
    FloatLabel,
    Select,
    DatePicker,
    InputNumber,
    Textarea,
    MoneyTagComponent,
  ],
  templateUrl: './budget-transaction-create-dialog.component.html',
  styleUrl: './budget-transaction-create-dialog.component.css',
})
export class BudgetTransactionCreateDialogComponent implements OnDestroy {
  public budgetCategories = input.required<BudgetCategory[]>();
  public visible = model<boolean>(false);
  public save = output<BudgetTransactionEntityData>();
  public budgetCategoriesChoices = computed(() => {
    return buildCategoriesSelectables(this.budgetCategories());
  });
  public selectedBudgetCategoryId = signal<string | undefined>(undefined);
  public selectedBudgetCategory: BudgetCategory | undefined;
  public onSelectedCategoryChange = effect(() => {
    this.budgetTransaction.categoryId = this.selectedBudgetCategoryId() as unknown as string;
    this.selectedBudgetCategory = this.budgetCategories().find(
      category => category.id === this.selectedBudgetCategoryId()
    );
  });

  public budgetTransaction: BudgetTransactionEntityData = {
    date: new Date(),
    categoryId: undefined,
    amount: 0,
    description: undefined,
    status: 'PAID',
  } as unknown as BudgetTransactionEntityData;

  protected readonly BudgetTransactionStatuses = BudgetTransactionStatuses;

  public ngOnDestroy(): void {
    this.onSelectedCategoryChange.destroy();
  }
}
