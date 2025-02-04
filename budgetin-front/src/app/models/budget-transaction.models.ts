import { ComputedFields, Entity, EntityData } from './common';
import { dateToDto } from '../utils/mappers.utils';

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

// Mapper

export abstract class BudgetTransactionMapper {
  static toDto(domain: BudgetTransactionEntityData): BudgetTransactionEntityDataDto {
    return {
      date: dateToDto(domain.date),
      categoryId: domain.categoryId,
      amount: domain.amount,
      description: domain.description,
      status: domain.status,
    };
  }

  static toBusiness(dto: BudgetTransactionDto): BudgetTransaction {
    return {
      id: dto.id,
      data: {
        date: new Date(dto.data.date),
        categoryId: dto.data.categoryId,
        amount: dto.data.amount,
        description: dto.data.description,
        status: dto.data.status,
      },
      computedFields: {
        ...dto.computedFields,
      },
    };
  }
}
