package dev.gallon.infra.db.mongo.common

import com.mongodb.kotlin.client.coroutine.MongoClient
import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.Entity
import io.kotest.matchers.equals.shouldBeEqual
import io.kotest.matchers.nulls.shouldNotBeNull
import kotlinx.coroutines.runBlocking
import kotlinx.datetime.Clock
import kotlinx.datetime.LocalDate
import org.junit.jupiter.api.Test
import org.testcontainers.containers.MongoDBContainer
import org.testcontainers.junit.jupiter.Container

class BudgetPlanMongoRepositoryTest {

    @Container
    private val mongoDBContainer: MongoDBContainer = MongoDBContainer("mongo:7.0.6")

    init {
        mongoDBContainer.start()
    }

    @Test
    fun crud() {
//        val mongoDbClient = MongoClient.create(mongoDBContainer.connectionString)
        val mongoDbClient = MongoClient.create("mongodb://localhost:27017/")

        val repository = MongoEntityRepository(
            mongoDbClient.getDatabase("test-crud").getCollection<BudgetPlan>(),
            Clock.System
        )

        val budgetPlan = BudgetPlan(
            moneyAtStart = 100f,
            expectedIncome = 50f,
            startDate = LocalDate.parse("2024-01-01"),
            endDate = LocalDate.parse("2024-02-01"),
            categories = listOf(
                BudgetCategory(
                    name = "house",
                    amount = 100f
                )
            )
        )

        // CREATE TEST
        val createdBudgetPlan = runBlocking {
            repository.create(budgetPlan)
        }
        createdBudgetPlan.data shouldBeEqual budgetPlan

        // READ TEST
        val readBudgetPlan = runBlocking {
            repository.searchOneById(createdBudgetPlan.id)
        }
        readBudgetPlan.shouldNotBeNull() shouldBeEqual createdBudgetPlan

        // EDIT TEST
        val editedBudgetPlan = runBlocking {
            repository.update(
                createdBudgetPlan.id,
                mapOf(Entity<*>::data.name / BudgetPlan::moneyAtStart.name to 200f)
            )
        }
        editedBudgetPlan.data shouldBeEqual budgetPlan.copy(moneyAtStart = 200f)

        // DELETE TEST
        val deletedBudgetPlan = runBlocking {
            repository.delete(createdBudgetPlan.id)
        }
        deletedBudgetPlan shouldBeEqual editedBudgetPlan

        mongoDbClient.close()
    }
}
