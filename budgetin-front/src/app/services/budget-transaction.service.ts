import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BudgetTransaction } from '../models/budget-transaction.models';

@Injectable({ providedIn: 'root' })
export class BudgetTransactionService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public fetchTransactionsByBudgetPlanId(budgetPlanId: string): Observable<BudgetTransaction[]> {
    return of([
      {
        id: '1000',
        entityData: {
          date: new Date(),
          amount: 65,
          description: 'essence',
          categoryId: 'car-id',
          status: 'PAID',
        },
        computedFields: {
          categoryName: 'Voiture',
        },
      },
      {
        id: '2000',
        entityData: {
          date: new Date(),
          amount: 65,
          description: 'essence 2',
          categoryId: 'car-id',
          status: 'PROCESSING',
        },
        computedFields: {
          categoryName: 'Voiture',
        },
      },
    ]);
  }
}
