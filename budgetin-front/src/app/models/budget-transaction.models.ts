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
      entityData: {
        date: new Date(dto.entityData.date),
        categoryId: dto.entityData.categoryId,
        amount: dto.entityData.amount,
        description: dto.entityData.description,
        status: dto.entityData.status,
      },
      computedFields: {
        ...dto.computedFields,
      },
    };
  }
}
