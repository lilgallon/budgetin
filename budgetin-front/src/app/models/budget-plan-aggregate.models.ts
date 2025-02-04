import { BudgetPlan, BudgetPlanDto, BudgetPlanMapper } from './budget-plan.models';
import { BudgetCategory, BudgetCategoryDto, BudgetCategoryMapper } from './budget-category.models';
import { BudgetTransaction, BudgetTransactionDto, BudgetTransactionMapper } from './budget-transaction.models';

// Domain

export interface BudgetPlanAggregate {
  plan: BudgetPlan,
  categories: BudgetCategory[],
  transactions: BudgetTransaction[],
}

// Dto

export interface BudgetPlanAggregateDto {
  plan: BudgetPlanDto,
  categories: BudgetCategoryDto[],
  transactions: BudgetTransactionDto[],
}

// Mapper

export abstract class BudgetPlanAggregateMapper {
  static toBusiness(budgetPlanAggregate: BudgetPlanAggregateDto): BudgetPlanAggregate {
    return {
      plan: BudgetPlanMapper.toBusiness(budgetPlanAggregate.plan),
      categories: budgetPlanAggregate.categories.map((dto) => BudgetCategoryMapper.toBusiness(dto)),
      transactions: budgetPlanAggregate.transactions.map((dto) => BudgetTransactionMapper.toBusiness(dto)),
    }
  }
}
