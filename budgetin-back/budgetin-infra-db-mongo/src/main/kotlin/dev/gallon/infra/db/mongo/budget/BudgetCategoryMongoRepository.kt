package dev.gallon.infra.db.mongo.budget

import com.mongodb.client.model.Filters.eq
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.Entity
import dev.gallon.domain.repositories.BudgetCategoryEntityRepository
import dev.gallon.infra.db.mongo.common.MongoEntityRepository
import dev.gallon.infra.db.mongo.common.getCollection
import kotlinx.coroutines.flow.Flow
import kotlinx.datetime.Clock

class BudgetCategoryMongoRepository(
    database: MongoDatabase,
    clock: Clock,
) : MongoEntityRepository<BudgetCategory>(database.getCollection(), clock), BudgetCategoryEntityRepository {
    override suspend fun searchManyByBudgetPlanId(budgetPlanId: String): Flow<Entity<BudgetCategory>> =
        searchMany(eq(BudgetCategory::budgetPlanId.name, budgetPlanId))
}
