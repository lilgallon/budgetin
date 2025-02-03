import { inject, Injectable } from '@angular/core';
import { BudgetPlanDto } from '../models/budget-dtos';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BudgetPlan } from '../models/budget-entities';

@Injectable({ providedIn: 'root' })
export class BudgetPlanService {
  private readonly httpClient = inject(HttpClient);

  public fetchBudgetPlans(): Observable<BudgetPlanDto[]> {
    return this.httpClient.get<BudgetPlanDto[]>('budgetPlan').pipe(map(dtos => dtos.map(dto => this.mapTypes(dto))));
  }

  public createBudgetPlan(budgetPlan: BudgetPlan): Observable<BudgetPlanDto> {
    return this.httpClient.post<BudgetPlanDto>('budgetPlan', budgetPlan).pipe(map(dto => this.mapTypes(dto)));
  }

  private mapTypes(budgetPlanDto: BudgetPlanDto): BudgetPlanDto {
    budgetPlanDto.entityData.startDate = new Date(budgetPlanDto.entityData.startDate);
    budgetPlanDto.entityData.endDate = new Date(budgetPlanDto.entityData.endDate);
    return budgetPlanDto;
  }
}
