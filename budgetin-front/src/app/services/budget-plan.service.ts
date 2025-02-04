import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BudgetPlan, BudgetPlanDto, BudgetPlanEntityData } from '../models/budget-plan.models';

@Injectable({ providedIn: 'root' })
export class BudgetPlanService {
  private readonly httpClient = inject(HttpClient);

  public fetchBudgetPlans(): Observable<BudgetPlan[]> {
    return this.httpClient
      .get<BudgetPlanDto[]>('budgetPlan')
      .pipe(map(dtos => dtos.map(dto => dto.toBusiness())));
  }

  public createBudgetPlan(budgetPlan: BudgetPlanEntityData): Observable<BudgetPlan> {
    return this.httpClient
      .post<BudgetPlanDto>('budgetPlan', budgetPlan.toDto())
      .pipe(map(dto => dto.toBusiness()));
  }
}
