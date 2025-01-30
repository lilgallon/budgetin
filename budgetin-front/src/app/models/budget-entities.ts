import { EntityData } from './common';

export interface BudgetPlan extends EntityData {
  amountAtStart: number;
  expectedIncome: number;
  startDate: Date;
  endDate: Date;
}

export interface BudgetCategory extends EntityData {
  name: string;
  amount: number;
  budgetPlanId: string;
}

export interface BudgetTransaction extends EntityData {
  date: Date;
  categoryId: string;
  amount: number;
  description: string;
  status: BudgetTransactionStatus;
}

export type BudgetTransactionStatus = 'PAID' | 'PROCESSING' | 'PLANNED';

export const BudgetTransactionStatuses = ['PAID', 'PROCESSING', 'PLANNED'];
