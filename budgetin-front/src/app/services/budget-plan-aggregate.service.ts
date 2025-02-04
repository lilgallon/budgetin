import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  BudgetPlanAggregate,
  BudgetPlanAggregateDto,
  BudgetPlanAggregateMapper,
} from '../models/budget-plan-aggregate.models';

@Injectable({ providedIn: 'root' })
export class BudgetPlanAggregateService {
  private readonly httpClient = inject(HttpClient);

  public fetchBudgetPlanAggregate(id: string): Observable<BudgetPlanAggregate> {
    return this.httpClient
      .get<BudgetPlanAggregateDto>(`budget/${id}`)
      .pipe(map((dto) => BudgetPlanAggregateMapper.toBusiness(dto)))
  }
}

