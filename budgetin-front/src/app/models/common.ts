// Domain

export type ComputedFields = object;

export type EntityData = object;

export interface Entity<D extends EntityData, C extends ComputedFields> {
  id: string;
  entityData: D;
  computedFields: C;
}

// Dto

export type EntityDataDto = object
export type ComputedFieldsDto = object;

export interface EntityDto<D extends EntityDataDto | EntityData, C extends ComputedFieldsDto | ComputedFields> {
  id: string;
  entityData: D;
  computedFields: C;
}
