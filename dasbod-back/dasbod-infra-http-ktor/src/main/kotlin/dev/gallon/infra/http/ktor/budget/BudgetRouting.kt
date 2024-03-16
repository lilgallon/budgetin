package dev.gallon.infra.http.ktor.budget

import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.services.BudgetPlanService
import dev.gallon.infra.http.ktor.common.configureEntityCrudRouting
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Route.configureBudgetRouting() {
    val budgetPlanService by inject<BudgetPlanService>()
    configureEntityCrudRouting<BudgetPlan>(budgetPlanService)
}
