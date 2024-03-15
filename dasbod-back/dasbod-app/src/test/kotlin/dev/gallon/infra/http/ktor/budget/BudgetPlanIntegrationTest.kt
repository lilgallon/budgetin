package dev.gallon.infra.http.ktor.budget

import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.Entity
import dev.gallon.main
import io.kotest.matchers.equals.shouldBeEqual
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.testing.*
import kotlinx.datetime.LocalDate
import org.junit.jupiter.api.Test

class BudgetPlanIntegrationTest {

    @Test
    fun crud() = testApplication {
        val client = createClient {
            install(ContentNegotiation) {
                json()
            }
        }

        application {
            main()
        }

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

        val createdEntity = client
            .post("/budgetPlan") {
                contentType(ContentType.Application.Json)
                setBody(budgetPlan)
            }
            .body<Entity<BudgetPlan>>()

        createdEntity.data shouldBeEqual budgetPlan

        val retrievedEntity = client
            .get("/budgetPlan/${createdEntity.id}")
            .body<Entity<BudgetPlan>>()

        retrievedEntity shouldBeEqual createdEntity

        val editedEntity = client
            .put("/budgetPlan/${createdEntity.id}") {
                contentType(ContentType.Application.Json)
                setBody(budgetPlan.copy(moneyAtStart = 200f))
            }
            .body<Entity<BudgetPlan>>()

        editedEntity.data shouldBeEqual budgetPlan.copy(moneyAtStart = 200f)

        val deletedEntity = client
            .delete("/budgetPlan/${createdEntity.id}") {
                contentType(ContentType.Application.Json)
                setBody(budgetPlan.copy(moneyAtStart = 200f))
            }
            .body<Entity<BudgetPlan>>()

        deletedEntity.data shouldBeEqual editedEntity.data

        val responseAfterDelete = client
            .get("/budgetPlan/${createdEntity.id}")

        responseAfterDelete.status shouldBeEqual HttpStatusCode.NotFound
    }
}
