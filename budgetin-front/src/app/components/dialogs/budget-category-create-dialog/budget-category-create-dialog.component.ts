import { Component, input, model, OnInit, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { MoneyTagComponent } from '../../../../shared/components/text/money-tag/money-tag.component';
import { BudgetPlan } from '../../../models/budget-plan.models';
import { BudgetCategoryEntityData } from '../../../models/budget-category.models';

@Component({
  selector: 'app-budget-category-create-dialog',
  imports: [Dialog, FormsModule, Fluid, FloatLabel, InputNumber, InputText, Button, DatePipe, MoneyTagComponent],
  templateUrl: './budget-category-create-dialog.component.html',
  styleUrl: './budget-category-create-dialog.component.css',
})
export class BudgetCategoryCreateDialogComponent implements OnInit {
  public budgetPlan = input.required<BudgetPlan>();
  public visible = model<boolean>(false);
  public save = output<BudgetCategoryEntityData>();

  public budgetCategory: BudgetCategoryEntityData = {
    name: undefined,
    budgetPlanId: undefined,
    amount: 0,
  } as unknown as BudgetCategoryEntityData;

  public ngOnInit(): void {
    this.budgetCategory.budgetPlanId = this.budgetPlan().id;
  }
}
