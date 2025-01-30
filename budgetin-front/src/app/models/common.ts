export type ComputedFields = object;

export type EntityData = object;

export interface Dto<D extends EntityData, C extends ComputedFields | unknown> {
  id: string;
  entityData: D;
  computedFields: C;
}
