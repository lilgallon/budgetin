import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BudgetCategoryDto } from '../models/budget-dtos';

@Injectable({ providedIn: 'root' })
export class BudgetCategoryService {
  public fetchBudgetCategoriesByBudgetPlanId(budgetPlanId: string): Observable<BudgetCategoryDto[]> {
    return of([
      {
        id: 'car-id',
        entityData: {
          name: 'Voiture',
          amount: 100,
          budgetPlanId: budgetPlanId,
        },
        computedFields: {
          spent: 80,
          percentSpent: 80,
          remaining: 20,
        },
      },
      {
        id: 'house-id',
        entityData: {
          name: 'Loyer',
          amount: 1300,
          budgetPlanId: budgetPlanId,
        },
        computedFields: {
          spent: 1300,
          percentSpent: 100,
          remaining: 0,
        },
      },
    ]);
  }
}
