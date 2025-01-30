// Main DTOs

import { ComputedFields, Dto } from './common';
import { BudgetCategory, BudgetPlan, BudgetTransaction } from './budget-entities';

export interface BudgetDto {
  plan: BudgetPlanDto;
  categories: BudgetCategoryDto[];
  transactions: BudgetTransactionDto[];
}

// Entities DTOs

export type BudgetPlanDto = Dto<BudgetPlan, BudgetPlanComputedFields>;
export type BudgetCategoryDto = Dto<BudgetCategory, BudgetCategoryComputedFields>;
export type BudgetTransactionDto = Dto<BudgetTransaction, BudgetTransactionComputedFields>;

// Computed Fields

export interface BudgetPlanComputedFields extends ComputedFields {
  alreadyBudgeted: number;
  toBeBudgeted: number;
}

export interface BudgetCategoryComputedFields extends ComputedFields {
  spent: number;
  remaining: number;
  percentSpent: number;
}

export interface BudgetTransactionComputedFields extends ComputedFields {
  categoryName: string;
}
