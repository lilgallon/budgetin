import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  BudgetTransaction,
  BudgetTransactionDto,
  BudgetTransactionEntityData,
  BudgetTransactionMapper,
} from '../models/budget-transaction.models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BudgetTransactionService {
  private readonly httpClient = inject(HttpClient);

  public createBudgetCategory(budgetTransaction: BudgetTransactionEntityData): Observable<BudgetTransaction> {
    return this.httpClient
      .post<BudgetTransactionDto>('budgetTransaction', BudgetTransactionMapper.toDto(budgetTransaction))
      .pipe(map(dto => BudgetTransactionMapper.toBusiness(dto)));
  }

  public updateBudgetTransaction(id: string, budgetTransaction: BudgetTransactionEntityData): Observable<BudgetTransaction> {
    return this.httpClient
      .put<BudgetTransactionDto>(`budgetTransaction/${id}`, BudgetTransactionMapper.toDto(budgetTransaction))
      .pipe(map(dto => BudgetTransactionMapper.toBusiness(dto)));
  }
}
