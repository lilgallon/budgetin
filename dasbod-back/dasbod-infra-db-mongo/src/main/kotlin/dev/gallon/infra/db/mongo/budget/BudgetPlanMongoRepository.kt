package dev.gallon.infra.db.mongo.budget

import com.mongodb.kotlin.client.coroutine.MongoDatabase
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.repositories.BudgetPlanEntityRepository
import dev.gallon.infra.db.mongo.common.MongoEntityRepository
import dev.gallon.infra.db.mongo.common.getCollection
import kotlinx.datetime.Clock

class BudgetPlanMongoRepository(
    database: MongoDatabase,
    clock: Clock,
) : MongoEntityRepository<BudgetPlan>(database.getCollection(), clock), BudgetPlanEntityRepository
