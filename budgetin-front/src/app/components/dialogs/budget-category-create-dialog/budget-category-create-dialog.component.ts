import { Component, input, model, OnInit, output } from '@angular/core';
import { BudgetCategory } from '../../../models/budget-entities';
import { BudgetPlanDto } from '../../../models/budget-dtos';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { MoneyTagComponent } from '../../../../shared/components/text/money-tag/money-tag.component';

@Component({
  selector: 'app-budget-category-create-dialog',
  imports: [Dialog, FormsModule, Fluid, FloatLabel, InputNumber, InputText, Button, DatePipe, MoneyTagComponent],
  templateUrl: './budget-category-create-dialog.component.html',
  styleUrl: './budget-category-create-dialog.component.css',
})
export class BudgetCategoryCreateDialogComponent implements OnInit {
  public budgetPlan = input.required<BudgetPlanDto>();
  public visible = model<boolean>(false);
  public save = output<BudgetCategory>();

  public budgetCategory: BudgetCategory = {
    name: undefined,
    budgetPlanId: undefined,
    amount: 0,
  } as unknown as BudgetCategory;

  public ngOnInit(): void {
    this.budgetCategory.budgetPlanId = this.budgetPlan().id;
  }
}
