import { inject, Injectable } from '@angular/core';
import { BudgetPlanDto } from '../models/budget-dtos';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BudgetPlan } from '../models/budget-entities';

@Injectable({ providedIn: 'root' })
export class BudgetPlanService {
  private readonly httpClient = inject(HttpClient);

  public fetchBudgetPlans(): Observable<BudgetPlanDto[]> {
    return this.httpClient
      .get<BudgetPlanDto[]>('budgetPlan')
      .pipe(map(dtos => dtos.map(dto => this.mapTypesFromServer(dto))));
  }

  public createBudgetPlan(budgetPlan: BudgetPlan): Observable<BudgetPlanDto> {
    return this.httpClient
      .post<BudgetPlanDto>('budgetPlan', this.mapTypesToServer(budgetPlan))
      .pipe(map(dto => this.mapTypesFromServer(dto)));
  }

  private mapTypesFromServer(budgetPlanDto: BudgetPlanDto): BudgetPlanDto {
    budgetPlanDto.entityData.startDate = new Date(budgetPlanDto.entityData.startDate);
    budgetPlanDto.entityData.endDate = new Date(budgetPlanDto.entityData.endDate);
    return budgetPlanDto;
  }

  private mapTypesToServer(budgetPlan: BudgetPlan): BudgetPlan {
    budgetPlan.startDate = this.formatDate(budgetPlan.startDate) as unknown as Date;
    budgetPlan.endDate = this.formatDate(budgetPlan.endDate) as unknown as Date;
    return budgetPlan;
  }

  private formatDate(date: Date): string {
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')
    return `${date.getFullYear()}-${month}-${day}`;
  }
}
