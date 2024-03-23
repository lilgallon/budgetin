package dev.gallon.domain.repositories

import dev.gallon.domain.common.Ref
import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.BudgetTransaction
import dev.gallon.domain.entities.Entity
import kotlinx.coroutines.flow.Flow

interface BudgetPlanEntityRepository : EntityRepository<BudgetPlan>

interface BudgetCategoryEntityRepository : EntityRepository<BudgetCategory> {
    suspend fun searchManyByBudgetPlanRef(budgetPlanRef: Ref<BudgetPlan>): Flow<Entity<BudgetCategory>>
}

interface BudgetTransactionEntityRepository : EntityRepository<BudgetTransaction> {
    suspend fun searchManyByCategoriesRefs(
        budgetCategoriesRefs: List<Ref<BudgetCategory>>,
    ): Flow<Entity<BudgetTransaction>>
}
