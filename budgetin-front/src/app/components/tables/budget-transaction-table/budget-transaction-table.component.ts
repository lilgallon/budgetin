import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Tag } from 'primeng/tag';
import { EditActionTableColumnComponent } from '../../../../shared/components/table/edit-action-table-column/edit-action-table-column.component';
import { DateEditableTableColumnComponent } from '../../../../shared/components/table/date-editable-table-column/date-editable-table-column.component';
import { MoneyEditableTableColumnComponent } from '../../../../shared/components/table/money-editable-table-column/money-editable-table-column.component';
import { LabelEditableTableColumnComponent } from '../../../../shared/components/table/label-editable-table-column/label-editable-table-column.component';
import { SelectEditableTableColumnComponent } from '../../../../shared/components/table/select-editable-table-column/select-editable-table-column.component';
import { Selectable } from '../../../../shared/models/selectable';
import { buildCategoriesSelectables } from '../../../models/budget-selectables';
import {
  BudgetTransaction,
  BudgetTransactionStatus,
  BudgetTransactionStatuses,
} from '../../../models/budget-transaction.models';
import { BudgetCategory } from '../../../models/budget-category.models';

@Component({
  selector: 'app-budget-transaction-table',
  imports: [
    TableModule,
    FormsModule,
    Tag,
    EditActionTableColumnComponent,
    DateEditableTableColumnComponent,
    MoneyEditableTableColumnComponent,
    LabelEditableTableColumnComponent,
    SelectEditableTableColumnComponent,
  ],
  templateUrl: './budget-transaction-table.component.html',
  styleUrl: './budget-transaction-table.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BudgetTransactionTableComponent {
  public budgetTransactions = input<BudgetTransaction[]>([]);
  public budgetCategories = input<BudgetCategory[]>([]);
  public selectableCategories = computed<Selectable[]>(() => buildCategoriesSelectables(this.budgetCategories()));

  public getSeverity(status: BudgetTransactionStatus) {
    switch (status) {
      case 'PAID':
        return 'success';
      case 'PROCESSING':
        return 'warn';
      case 'PLANNED':
        return 'contrast';
    }
  }

  public onRowEditSave(transaction: BudgetTransaction): void {
    // todo: UPDATE
    console.log(transaction);
  }

  protected readonly BudgetTransactionStatuses = BudgetTransactionStatuses.map(x => {
    return { label: x, id: x } as Selectable;
  });
}
