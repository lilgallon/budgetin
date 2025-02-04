import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BudgetCategoryDto, BudgetCategoryEntityData, BudgetCategoryMapper } from '../models/budget-category.models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BudgetCategoryService {
  private readonly httpClient = inject(HttpClient);

  public createBudgetCategory(budgetCategory: BudgetCategoryEntityData): Observable<BudgetCategoryDto> {
    return this.httpClient
      .post<BudgetCategoryDto>('budgetCategory', BudgetCategoryMapper.toDto(budgetCategory))
      .pipe(map(dto => BudgetCategoryMapper.toBusiness(dto)));
  }

  public updateBudgetCategory(id: string, budgetCategory: BudgetCategoryEntityData): Observable<BudgetCategoryDto> {
    return this.httpClient
      .put<BudgetCategoryDto>(`budgetCategory/${id}`, BudgetCategoryMapper.toDto(budgetCategory))
      .pipe(map(dto => BudgetCategoryMapper.toBusiness(dto)));
  }
}
