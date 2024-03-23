package dev.gallon.infra.http.ktor.budget

import dev.gallon.AppConfig
import dev.gallon.DatabaseConfig
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.Entity
import dev.gallon.infra.http.ktor.common.AuthConfig
import dev.gallon.infra.http.ktor.common.HttpServerConfig
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
import org.testcontainers.containers.MongoDBContainer
import org.testcontainers.junit.jupiter.Container

class BudgetPlanIntegrationTest {
    @Container
    private val mongoDBContainer: MongoDBContainer = MongoDBContainer("mongo:7.0.6")

    init {
        mongoDBContainer.start()
    }

    @Test
    fun crud() = testApplication {
        val client = createClient {
            install(ContentNegotiation) {
                json()
            }
        }

        application {
            main(
                AppConfig(
                    httpServerConfig = HttpServerConfig(
                        authConfig = AuthConfig(
                            enabled = false,
                            audience = "",
                            issuer = "",
                        ),
                    ),
                    databaseConfig = DatabaseConfig(
                        uri = mongoDBContainer.connectionString,
                        dbName = "integration-test",
                    ),
                ),
            )
        }

        val budgetPlan = BudgetPlan(
            amountAtStart = 100.0,
            expectedIncome = 50.0,
            startDate = LocalDate.parse("2024-01-01"),
            endDate = LocalDate.parse("2024-02-01"),
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
                setBody(budgetPlan.copy(amountAtStart = 200.0))
            }
            .body<Entity<BudgetPlan>>()

        editedEntity.data shouldBeEqual budgetPlan.copy(amountAtStart = 200.0)

        val deletedEntity = client
            .delete("/budgetPlan/${createdEntity.id}") {
                contentType(ContentType.Application.Json)
                setBody(budgetPlan.copy(amountAtStart = 200.0))
            }
            .body<Entity<BudgetPlan>>()

        deletedEntity.data shouldBeEqual editedEntity.data

        val responseAfterDelete = client
            .get("/budgetPlan/${createdEntity.id}")

        responseAfterDelete.status shouldBeEqual HttpStatusCode.NotFound
    }
}
