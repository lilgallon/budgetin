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

export abstract class BudgetPlanMapper {
  static toDto(domain: BudgetPlanEntityData): BudgetPlanEntityDataDto {
    return {
      amountAtStart: domain.amountAtStart,
      expectedIncome: domain.expectedIncome,
      startDate: dateToDto(domain.startDate),
      endDate: dateToDto(domain.endDate),
    };
  }

  static toBusiness(dto: BudgetPlanDto): BudgetPlan {
    return {
      id: dto.id,
      data: {
        amountAtStart: dto.data.amountAtStart,
        expectedIncome: dto.data.expectedIncome,
        startDate: new Date(dto.data.startDate),
        endDate: new Date(dto.data.endDate),
      },
      computedFields: {
        ...dto.computedFields,
      },
    };
  }
}
