package dev.gallon.infra.db.mongo.common

import com.mongodb.kotlin.client.coroutine.MongoClient
import dev.gallon.domain.entities.BudgetPlan
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
        val mongoDbClient = MongoClient.create(mongoDBContainer.connectionString)
        val database = mongoDbClient.getDatabase("test-crud")

        val repository = MongoEntityRepository(
            database.getCollection<BudgetPlan>(),
            Clock.System,
        )

        val budgetPlan = BudgetPlan(
            amountAtStart = 100.0,
            expectedIncome = 50.0,
            startDate = LocalDate.parse("2024-01-01"),
            endDate = LocalDate.parse("2024-02-01"),
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
                readBudgetPlan.data.copy(amountAtStart = 200.0),
            )
        }
        editedBudgetPlan.data shouldBeEqual createdBudgetPlan.data.copy(amountAtStart = 200.0)

        // DELETE TEST
        val deletedBudgetPlan = runBlocking {
            repository.delete(createdBudgetPlan.id)
        }
        deletedBudgetPlan.data shouldBeEqual editedBudgetPlan.data

        runBlocking {
            database.drop()
        }
        mongoDbClient.close()
    }
}
