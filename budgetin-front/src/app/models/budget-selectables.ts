import { Selectable } from '../shared/models/selectable';
import { BudgetCategoryDto } from './budget-dtos';

export function buildCategoriesSelectables(categories: BudgetCategoryDto[]): Selectable[] {
  return categories.map(category => buildCategorySelectable(category));
}

export function buildCategorySelectable(category: BudgetCategoryDto): Selectable {
  return {
    id: category.id,
    label: category.entityData.name,
  };
}
