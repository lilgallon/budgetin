import { EntityData, Reference } from "@/lib/data/common"

export interface BudgetPlan extends EntityData {
  amountAtStart: number
  expectedIncome: number
  startDate: string
  endDate: string
}

export interface BudgetCategory extends EntityData {
  name: string
  amount: number
  budgetPlanRef: Reference
}

export interface BudgetTransaction extends EntityData {
  date: string
  categoryRef: Reference
  amount: number
  description: string
  status: BudgetTransactionStatus
}

export const budgetTransactionStatuses = [
  "PAID",
  "PROCESSING",
  "PLANNED",
] as const

export type BudgetTransactionStatus = typeof budgetTransactionStatuses
