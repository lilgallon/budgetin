package dev.gallon.infra.http.ktor.budget

import io.ktor.server.application.*

fun Application.configureBudgetRouting() {
    configureBudgetPlanRouting()
}
