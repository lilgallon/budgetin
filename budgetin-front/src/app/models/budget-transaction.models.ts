import { ComputedFields, Entity, EntityData } from './common';

// Domain

export type BudgetTransaction = Entity<BudgetTransactionEntityData, BudgetTransactionComputedFields>;

export interface BudgetTransactionEntityData extends EntityData {
  date: Date;
  categoryId: string;
  amount: number;
  description: string;
  status: BudgetTransactionStatus;
}

export interface BudgetTransactionComputedFields extends ComputedFields {
  categoryName: string;
}

export type BudgetTransactionStatus = 'PAID' | 'PROCESSING' | 'PLANNED';

export const BudgetTransactionStatuses = ['PAID', 'PROCESSING', 'PLANNED'];

// Dto

export type BudgetTransactionDto = Entity<BudgetTransactionEntityDataDto, BudgetTransactionComputedFields>;

export interface BudgetTransactionEntityDataDto extends EntityData {
  date: string; // YYYY-MM-DD
  categoryId: string;
  amount: number;
  description: string;
  status: BudgetTransactionStatus;
}
