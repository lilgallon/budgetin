package dev.gallon.infra.http.ktor.budget

import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.BudgetTransaction
import dev.gallon.domain.services.BudgetCategoryService
import dev.gallon.domain.services.BudgetPlanService
import dev.gallon.domain.services.BudgetTransactionService
import dev.gallon.infra.http.ktor.common.configureEntityCrudRouting
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.toList
import org.koin.ktor.ext.inject

fun Route.configureBudgetRouting() {
    // Entities - for individual CRUD
    val budgetPlanService by inject<BudgetPlanService>()
    val budgetCategoryService by inject<BudgetCategoryService>()
    val budgetTransactionService by inject<BudgetTransactionService>()

    configureEntityCrudRouting<BudgetPlan>(budgetPlanService) {
        get {
            val plans: List<BudgetPlanDto> = budgetPlanService.searchMany()
                .toList()
                .map { it.toDto() }
            val categories: Map<String, List<BudgetCategoryDto>> = budgetCategoryService
                .searchManyByBudgetPlanIds(plans.map { it.id })
                .toList()
                .map { it.toDto() }
                .groupBy { it.data.budgetPlanId }

            call.respond(
                HttpStatusCode.OK,
                plans.asFlow().map {
                    it.withComputedFieldsUsing(categories[it.id].orEmpty())
                },
            )
        }
    }

    configureEntityCrudRouting<BudgetCategory>(budgetCategoryService)

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
                .searchManyByBudgetPlanIds(listOf(budgetPlanDto!!.id))
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
