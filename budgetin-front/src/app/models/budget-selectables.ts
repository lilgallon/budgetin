import { Selectable } from '../../shared/models/selectable';
import { BudgetCategory } from './budget-category.models';

export function buildCategoriesSelectables(categories: BudgetCategory[]): Selectable[] {
  return categories.map(category => buildCategorySelectable(category));
}

export function buildCategorySelectable(category: BudgetCategory): Selectable {
  return {
    id: category.id,
    label: category.entityData.name,
  };
}
