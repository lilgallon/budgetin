package dev.gallon.domain.services

import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.BudgetTransaction
import dev.gallon.domain.entities.Entity
import dev.gallon.domain.repositories.BudgetCategoryEntityRepository
import dev.gallon.domain.repositories.BudgetPlanEntityRepository
import dev.gallon.domain.repositories.BudgetTransactionEntityRepository
import kotlinx.coroutines.flow.Flow

class BudgetPlanService(
    repository: BudgetPlanEntityRepository,
) : EntityService<BudgetPlan>(repository)

class BudgetCategoryService(
    private val repository: BudgetCategoryEntityRepository,
) : EntityService<BudgetCategory>(repository) {
    suspend fun searchManyByBudgetPlanId(budgetPlanId: String): Flow<Entity<BudgetCategory>> =
        repository.searchManyByBudgetPlanId(budgetPlanId)
}

class BudgetTransactionService(
    private val repository: BudgetTransactionEntityRepository,
) : EntityService<BudgetTransaction>(repository) {
    suspend fun searchManyByCategoriesIds(
        budgetCategoriesIds: List<String>,
    ): Flow<Entity<BudgetTransaction>> = repository.searchManyByCategoriesIds(budgetCategoriesIds)
}
