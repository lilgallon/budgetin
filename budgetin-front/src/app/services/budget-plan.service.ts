import { Injectable } from '@angular/core';
import { BudgetPlanDto } from '../models/budget-dtos';
import { map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BudgetPlanService {
  public fetchBudgetPlans(): Observable<BudgetPlanDto[]> {
    return of([
      {
        id: 'budgetplan-id',
        entityData: {
          amountAtStart: 123,
          expectedIncome: 2000,
          startDate: new Date(2025, 1, 1).toISOString(),
          endDate: new Date(2025, 1, 20).toISOString(),
        },
        computedFields: {
          alreadyBudgeted: 500,
          toBeBudgeted: 1300,
        },
      } as unknown as BudgetPlanDto,
      {
        id: 'budgetplan-id2',
        entityData: {
          amountAtStart: 400,
          expectedIncome: 1000,
          startDate: new Date(2025, 2, 1).toISOString(),
          endDate: new Date(2025, 2, 28).toISOString(),
        },
        computedFields: {
          alreadyBudgeted: 100,
          toBeBudgeted: 1300,
        },
      } as unknown as BudgetPlanDto,
    ]).pipe(
      map(list => {
        return list.map(dto => {
          dto.entityData.startDate = new Date(dto.entityData.startDate);
          dto.entityData.endDate = new Date(dto.entityData.endDate);
          return dto;
        });
      })
    );
  }
}
