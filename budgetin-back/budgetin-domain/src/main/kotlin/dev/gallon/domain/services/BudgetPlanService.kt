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
    private val repository: BudgetPlanEntityRepository,
) : EntityService<BudgetPlan>(repository) {
    suspend fun searchMany(): Flow<Entity<BudgetPlan>> =
        repository.searchMany()
}

class BudgetCategoryService(
    private val repository: BudgetCategoryEntityRepository,
) : EntityService<BudgetCategory>(repository) {
    suspend fun searchManyByBudgetPlanIds(budgetPlanIds: List<String>): Flow<Entity<BudgetCategory>> =
        repository.searchManyByBudgetPlanIds(budgetPlanIds)
}

class BudgetTransactionService(
    private val repository: BudgetTransactionEntityRepository,
) : EntityService<BudgetTransaction>(repository) {
    suspend fun searchManyByCategoriesIds(
        budgetCategoriesIds: List<String>,
    ): Flow<Entity<BudgetTransaction>> = repository.searchManyByCategoriesIds(budgetCategoriesIds)
}
