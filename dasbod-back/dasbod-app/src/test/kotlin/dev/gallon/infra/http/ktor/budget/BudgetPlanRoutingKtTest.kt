package dev.gallon.infra.http.ktor.budget

import dev.gallon.main
import io.ktor.client.request.*
import io.ktor.server.testing.*
import org.junit.jupiter.api.Test

class BudgetPlanRoutingKtTest {

    @Test
    fun testGetBudgetplansId() = testApplication {
        application {
            main()
        }
        client.get("/budgetPlans/123").apply {
            println("lol $this")
            // TODO z
        }
    }
}
