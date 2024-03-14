package dev.gallon.infra.http.ktor.budget

import io.ktor.server.application.*
import io.ktor.server.routing.*

fun Route.configureBudgetRouting() {
    configureBudgetPlanRouting()
}
