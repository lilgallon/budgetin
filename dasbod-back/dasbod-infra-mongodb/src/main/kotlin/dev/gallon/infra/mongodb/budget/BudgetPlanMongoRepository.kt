package dev.gallon.infra.mongodb.budget

import com.mongodb.kotlin.client.coroutine.MongoDatabase
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.repositories.BudgetPlanEntityRepository
import dev.gallon.infra.mongodb.common.MongoEntityRepository
import dev.gallon.infra.mongodb.common.getCollection
import kotlinx.datetime.Clock

class BudgetPlanMongoRepository(
    database: MongoDatabase,
    clock: Clock
) : MongoEntityRepository<BudgetPlan>(database.getCollection(), clock), BudgetPlanEntityRepository
