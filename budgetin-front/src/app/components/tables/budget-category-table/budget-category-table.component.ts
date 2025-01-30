import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { BudgetCategoryDto } from '../../../models/budget-dtos';
import { ProgressBar } from 'primeng/progressbar';
import { LabelEditableTableColumnComponent } from '../../../shared/components/table/label-editable-table-column/label-editable-table-column.component';
import { MoneyEditableTableColumnComponent } from '../../../shared/components/table/money-editable-table-column/money-editable-table-column.component';
import { EditActionTableColumnComponent } from '../../../shared/components/table/edit-action-table-column/edit-action-table-column.component';

@Component({
  selector: 'app-budget-category-table',
  imports: [
    TableModule,
    CurrencyPipe,
    ProgressBar,
    LabelEditableTableColumnComponent,
    MoneyEditableTableColumnComponent,
    EditActionTableColumnComponent,
  ],
  templateUrl: './budget-category-table.component.html',
  styleUrl: './budget-category-table.component.css',
})
export class BudgetCategoryTableComponent {
  public budgetCategories = input<BudgetCategoryDto[]>([]);

  public onRowEditSave(category: BudgetCategoryDto): void {
    // todo: UPDATE
    console.log(category);
  }
}
