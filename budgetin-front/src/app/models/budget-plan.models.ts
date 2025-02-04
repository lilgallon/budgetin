import { ComputedFields, Entity, EntityData, EntityDto } from './common';
import { dateToDto } from '../utils/mappers.utils';

// Domain

export type BudgetPlan = Entity<BudgetPlanEntityData, BudgetPlanComputedFields>;

export interface BudgetPlanEntityData extends EntityData {
  amountAtStart: number;
  expectedIncome: number;
  startDate: Date;
  endDate: Date;
}

export interface BudgetPlanComputedFields extends ComputedFields {
  alreadyBudgeted: number;
  toBeBudgeted: number;
}

// Dto

export type BudgetPlanDto = EntityDto<BudgetPlanEntityDataDto, BudgetPlanComputedFields>;

export interface BudgetPlanEntityDataDto extends EntityData {
  amountAtStart: number;
  expectedIncome: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

// Mappers

export function planToDto(plan: BudgetPlanEntityData): BudgetPlanEntityDataDto {
  return {
    amountAtStart: plan.amountAtStart,
    expectedIncome: plan.expectedIncome,
    startDate: dateToDto(plan.startDate),
    endDate: dateToDto(plan.endDate),
  }
}
