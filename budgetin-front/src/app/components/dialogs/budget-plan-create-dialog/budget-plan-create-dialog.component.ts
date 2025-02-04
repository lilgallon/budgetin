import { Component, model, OnInit, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';
import { Fluid } from 'primeng/fluid';
import { Tag } from 'primeng/tag';
import { BudgetPlanEntityData } from '../../../models/budget-plan.models';

@Component({
  selector: 'app-budget-plan-create-dialog',
  imports: [Dialog, Button, FormsModule, DatePicker, FloatLabel, InputNumber, Fluid, Tag],
  templateUrl: './budget-plan-create-dialog.component.html',
  styleUrl: './budget-plan-create-dialog.component.css',
})
export class BudgetPlanCreateDialogComponent implements OnInit {
  public visible = model<boolean>(false);
  public save = output<BudgetPlanEntityData>();

  public budgetPlan: BudgetPlanEntityData = {
    startDate: new Date(),
    endDate: new Date(),
    expectedIncome: 0,
    amountAtStart: 0,
  };
  public range: Date[] = [];

  public ngOnInit(): void {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    this.range = [startDate, endDate];
    this.budgetPlan.startDate = startDate;
    this.budgetPlan.endDate = endDate;
  }

  public onRangeChange(range: Date[]): void {
    this.budgetPlan.startDate = range[0];
    this.budgetPlan.endDate = range[1];
  }
}
