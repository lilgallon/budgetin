import { Component, computed, effect, input, model, OnDestroy, output, signal } from '@angular/core';
import { BudgetCategoryDto } from '../../../models/budget-dtos';
import { BudgetTransaction, BudgetTransactionStatuses } from '../../../models/budget-entities';
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
  public budgetCategories = input.required<BudgetCategoryDto[]>();
  public visible = model<boolean>(false);
  public save = output<BudgetTransaction>();
  public budgetCategoriesChoices = computed(() => {
    return buildCategoriesSelectables(this.budgetCategories());
  });
  public selectedBudgetCategoryId = signal<string | undefined>(undefined);
  public selectedBudgetCategory: BudgetCategoryDto | undefined;
  public onSelectedCategoryChange = effect(() => {
    this.budgetTransaction.categoryId = this.selectedBudgetCategoryId() as unknown as string;
    this.selectedBudgetCategory = this.budgetCategories().find(
      category => category.id === this.selectedBudgetCategoryId()
    );
  });

  public budgetTransaction: BudgetTransaction = {
    date: new Date(),
    categoryId: undefined,
    amount: 0,
    description: undefined,
    status: 'PAID',
  } as unknown as BudgetTransaction;

  protected readonly BudgetTransactionStatuses = BudgetTransactionStatuses;

  public ngOnDestroy(): void {
    this.onSelectedCategoryChange.destroy();
  }
}
