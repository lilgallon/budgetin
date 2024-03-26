export interface ComputedFields {}

export interface EntityData {}

export interface Dto<D extends EntityData, C extends ComputedFields | unknown> {
  id: string
  entityData: D
  computedFields: C
}

export interface Reference {
  id: string
  type: string
}
