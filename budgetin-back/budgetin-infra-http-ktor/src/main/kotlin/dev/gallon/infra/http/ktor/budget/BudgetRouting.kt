package dev.gallon.infra.http.ktor.budget

import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.BudgetTransaction
import dev.gallon.domain.entities.Entity
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

    configureEntityCrudRouting<BudgetPlan, BudgetPlanDto>(budgetPlanService,
        toDto = {
            toDto().withComputedFieldsUsing(
                allBudgetCategories = budgetCategoryService
                    .searchManyByBudgetPlanIds(budgetPlanIds = listOf(id))
                    .toList()
            )
        },
        additionalRoutesBuilder = {
            get {
                val plans: List<BudgetPlanDto> = budgetPlanService.searchMany()
                    .toList()
                    .map { it.toDto() }
                val categories: Map<String, List<Entity<BudgetCategory>>> = budgetCategoryService
                    .searchManyByBudgetPlanIds(plans.map { it.id })
                    .toList()
                    .groupBy { it.data.budgetPlanId }

                call.respond(
                    HttpStatusCode.OK,
                    plans.asFlow().map {
                        it.withComputedFieldsUsing(categories[it.id].orEmpty())
                    },
                )
            }
        }
    )

    configureEntityCrudRouting<BudgetCategory, BudgetCategoryDto>(
        service = budgetCategoryService,
        toDto = {
            toDto().withComputedFieldsUsing(
                allTransactions = budgetTransactionService.searchManyByCategoriesIds(listOf(id)).toList()
            )
        }
    )

    configureEntityCrudRouting<BudgetTransaction, BudgetTransactionDto>(
        service = budgetTransactionService,
        toDto = {
            toDto().withComputedFieldsUsing(
                allBudgetCategories = listOf(budgetCategoryService.searchOneById(data.categoryId)!!)
            )
        }
    )

    // DTOs - for data display
    route("/budget") {
        get("/{id}") {
            val budgetPlanId = call.parameters["id"]!!

            val budgetPlanDto: Entity<BudgetPlan>? = budgetPlanService
                .searchOneById(budgetPlanId)

            if (budgetPlanDto == null) {
                call.respond(HttpStatusCode.NotFound)
            }

            val categories: List<Entity<BudgetCategory>> = budgetCategoryService
                .searchManyByBudgetPlanIds(listOf(budgetPlanDto!!.id))
                .toList()

            val transactions: List<Entity<BudgetTransaction>> = budgetTransactionService
                .searchManyByCategoriesIds(categories.map { it.id })
                .toList()

            call.respond(
                HttpStatusCode.OK,
                BudgetDto(
                    plan = budgetPlanDto.toDto().withComputedFieldsUsing(categories),
                    categories = categories.map { it.toDto().withComputedFieldsUsing(transactions) },
                    transactions = transactions.map { it.toDto().withComputedFieldsUsing(categories) },
                ),
            )
        }
    }
}
