import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BudgetPlan, BudgetPlanDto, BudgetPlanEntityData, BudgetPlanMapper } from '../models/budget-plan.models';

@Injectable({ providedIn: 'root' })
export class BudgetPlanService {
  private readonly httpClient = inject(HttpClient);

  public fetchBudgetPlans(): Observable<BudgetPlan[]> {
    return this.httpClient
      .get<BudgetPlanDto[]>('budgetPlan')
      .pipe(map(dtos => dtos.map(dto => BudgetPlanMapper.toBusiness(dto))));
  }

  public createBudgetPlan(budgetPlan: BudgetPlanEntityData): Observable<BudgetPlan> {
    return this.httpClient
      .post<BudgetPlanDto>('budgetPlan', BudgetPlanMapper.toDto(budgetPlan))
      .pipe(map(dto => BudgetPlanMapper.toBusiness(dto)));
  }

  public updateBudgetPlan(id: string, budgetPlan: BudgetPlanEntityData): Observable<BudgetPlan> {
    return this.httpClient
      .put<BudgetPlanDto>(`budgetPlan/${id}`, BudgetPlanMapper.toDto(budgetPlan))
      .pipe(map(dto => BudgetPlanMapper.toBusiness(dto)));
  }
}
