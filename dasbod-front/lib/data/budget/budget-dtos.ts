import {
  BudgetCategory,
  BudgetPlan,
  BudgetTransaction,
} from "@/lib/data/budget/budget-entities"
import { ComputedFields, Dto } from "@/lib/data/common"

// Main DTOs

export interface BudgetDto {
  plan: BudgetPlanDto
  categories: BudgetCategoryDto[]
  transactions: BudgetTransactionDto[]
}

// Entities DTOs

export interface BudgetPlanDto extends Dto<BudgetPlan, unknown> {}
export interface BudgetCategoryDto
  extends Dto<BudgetCategory, BudgetCategoryComputedFields> {}
export interface BudgetTransactionDto
  extends Dto<BudgetTransaction, BudgetTransactionComputedFields> {}

// Computed Fields

export interface BudgetCategoryComputedFields extends ComputedFields {
  spent: number
  remaining: number
  percentSpent: number
}

export interface BudgetTransactionComputedFields extends ComputedFields {
  categoryName: string
}
