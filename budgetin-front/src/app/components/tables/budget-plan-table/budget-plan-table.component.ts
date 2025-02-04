import { Component, input, model, output, ViewEncapsulation } from '@angular/core';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DateEditableTableColumnComponent } from '../../../../shared/components/table/date-editable-table-column/date-editable-table-column.component';
import { MoneyEditableTableColumnComponent } from '../../../../shared/components/table/money-editable-table-column/money-editable-table-column.component';
import { EditActionTableColumnComponent } from '../../../../shared/components/table/edit-action-table-column/edit-action-table-column.component';
import { BudgetPlan } from '../../../models/budget-plan.models';

@Component({
  selector: 'app-budget-plan-table',
  imports: [
    TableModule,
    FormsModule,
    DateEditableTableColumnComponent,
    MoneyEditableTableColumnComponent,
    EditActionTableColumnComponent,
  ],
  templateUrl: './budget-plan-table.component.html',
  styleUrl: './budget-plan-table.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BudgetPlanTableComponent {
  public budgetPlans = input<BudgetPlan[]>([]);
  public budgetPlanEdit = output<BudgetPlan>();
  public budgetPlanSelect = output<BudgetPlan>();
  public budgetPlanUnselect = output();
  public selection = model<BudgetPlan[]>([]);

  public onRowSelect(event: TableRowSelectEvent): void {
    this.budgetPlanSelect.emit(event.data);
  }

  public onRowUnselect(): void {
    this.budgetPlanUnselect.emit();
  }

  onRowEditSave(plan: BudgetPlan): void {
    // todo: UPDATE
    console.log(plan);
  }
}
