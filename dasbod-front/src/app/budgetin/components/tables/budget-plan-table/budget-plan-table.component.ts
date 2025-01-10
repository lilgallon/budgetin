import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { BudgetPlanDto } from '../../../models/budget-dtos';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { DateEditableTableColumnComponent } from '../../../../shared/components/table/date-editable-table-column/date-editable-table-column.component';
import { MoneyEditableTableColumnComponent } from '../../../../shared/components/table/money-editable-table-column/money-editable-table-column.component';
import { EditActionTableColumnComponent } from '../../../../shared/components/table/edit-action-table-column/edit-action-table-column.component';

@Component({
  selector: 'app-budget-plan-table',
  imports: [
    CurrencyPipe,
    DatePipe,
    TableModule,
    FormsModule,
    DatePicker,
    Ripple,
    NgIf,
    Button,
    DateEditableTableColumnComponent,
    MoneyEditableTableColumnComponent,
    EditActionTableColumnComponent,
  ],
  templateUrl: './budget-plan-table.component.html',
  styleUrl: './budget-plan-table.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BudgetPlanTableComponent {
  public budgetPlans = input<BudgetPlanDto[]>([]);
  public budgetPlanEdit = output<BudgetPlanDto>();
  public budgetPlanSelect = output<BudgetPlanDto>();
  public budgetPlanUnselect = output();

  public onRowSelect(event: TableRowSelectEvent): void {
    this.budgetPlanSelect.emit(event.data);
  }

  public onRowUnselect(): void {
    this.budgetPlanUnselect.emit();
  }

  onRowEditSave(plan: BudgetPlanDto): void {
    // todo: UPDATE
    console.log(plan);
  }
}
