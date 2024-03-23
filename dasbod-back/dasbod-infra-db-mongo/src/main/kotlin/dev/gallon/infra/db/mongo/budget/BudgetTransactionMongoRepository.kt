package dev.gallon.infra.db.mongo.budget

import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import dev.gallon.domain.common.Ref
import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.BudgetTransaction
import dev.gallon.domain.entities.Entity
import dev.gallon.domain.repositories.BudgetTransactionEntityRepository
import dev.gallon.infra.db.mongo.common.MongoEntityRepository
import dev.gallon.infra.db.mongo.common.div
import dev.gallon.infra.db.mongo.common.getCollection
import kotlinx.coroutines.flow.Flow
import kotlinx.datetime.Clock

class BudgetTransactionMongoRepository(
    database: MongoDatabase,
    clock: Clock,
) : MongoEntityRepository<BudgetTransaction>(database.getCollection(), clock), BudgetTransactionEntityRepository {
    override suspend fun searchManyByCategoriesRefs(
        budgetCategoriesRefs: List<Ref<BudgetCategory>>,
    ): Flow<Entity<BudgetTransaction>> = searchMany(
        Filters.`in`(BudgetTransaction::categoryRef / Ref<*>::id, budgetCategoriesRefs.map { it.id }),
    )
}
