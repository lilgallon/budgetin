import { ComputedFields, Entity, EntityData, EntityDto } from './common';

// Domain

export type BudgetCategory = Entity<BudgetCategoryEntityData, BudgetCategoryComputedFields>;

export interface BudgetCategoryEntityData extends EntityData {
  name: string;
  amount: number;
  budgetPlanId: string;
}

export interface BudgetCategoryComputedFields extends ComputedFields {
  spent: number;
  remaining: number;
  percentSpent: number;
}

// Dto

export type BudgetCategoryDto = EntityDto<BudgetCategoryEntityData, BudgetCategoryComputedFields>;

// Mappers

export abstract class BudgetCategoryMapper {
  static toDto(domain: BudgetCategoryEntityData): BudgetCategoryEntityData {
    return {
      ...domain,
    };
  }

  static toBusiness(dto: BudgetCategoryDto): BudgetCategory {
    return {
      ...dto,
    };
  }
}
