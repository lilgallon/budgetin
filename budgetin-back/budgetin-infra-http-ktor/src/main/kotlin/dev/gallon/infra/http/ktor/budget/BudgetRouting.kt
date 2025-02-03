package dev.gallon.infra.http.ktor.budget

import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.BudgetTransaction
import dev.gallon.domain.services.BudgetCategoryService
import dev.gallon.domain.services.BudgetPlanService
import dev.gallon.domain.services.BudgetTransactionService
import dev.gallon.infra.http.ktor.common.configureEntityCrudRouting
import dev.gallon.infra.http.ktor.common.toDto
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.toList
import org.koin.ktor.ext.inject

fun Route.configureBudgetRouting() {
    // Entities - for individual CRUD
    val budgetPlanService by inject<BudgetPlanService>()
    configureEntityCrudRouting<BudgetPlan>(budgetPlanService) {
        get {
            call.respond(
                HttpStatusCode.OK,
                budgetPlanService.searchMany().map { it.toDto() }
            )
        }
    }

    val budgetCategoryService by inject<BudgetCategoryService>()
    configureEntityCrudRouting<BudgetCategory>(budgetCategoryService)

    val budgetTransactionService by inject<BudgetTransactionService>()
    configureEntityCrudRouting<BudgetTransaction>(budgetTransactionService)

    // DTOs - for data display
    route("/budget") {
        get("/{id}") {
            val budgetPlanId = call.parameters["id"]!!

            val budgetPlanDto: BudgetPlanDto? = budgetPlanService
                .searchOneById(budgetPlanId)
                ?.toDto()

            if (budgetPlanDto == null) {
                call.respond(HttpStatusCode.NotFound)
            }

            val categories: List<BudgetCategoryDto> = budgetCategoryService
                .searchManyByBudgetPlanId(budgetPlanDto!!.id)
                .toList()
                .map { it.toDto() }

            val transactions: List<BudgetTransactionDto> = budgetTransactionService
                .searchManyByCategoriesIds(categories.map { it.id })
                .toList()
                .map { it.toDto() }

            call.respond(
                HttpStatusCode.OK,
                BudgetDto(
                    plan = budgetPlanDto.withComputedFieldsUsing(categories),
                    categories = categories.map { it.withComputedFieldsUsing(transactions) },
                    transactions = transactions.map { it.withComputedFieldsUsing(categories) },
                ),
            )
        }
    }
}
