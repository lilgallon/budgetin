package dev.gallon.infra.http.ktor.budget

import dev.gallon.main
import io.ktor.client.request.*
import io.ktor.server.testing.*
import kotlin.test.Test

class BudgetPlanRoutingKtTest {

    @Test
    fun testGetBudgetplansId() = testApplication {
        application {
            main()
        }
        client.get("/budgetPlans/{id}").apply {
            println("lol $this")
            // TODO
        }
    }
}
