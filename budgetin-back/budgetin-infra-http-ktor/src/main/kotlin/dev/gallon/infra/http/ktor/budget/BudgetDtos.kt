package dev.gallon.infra.http.ktor.budget

import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.BudgetTransaction
import dev.gallon.infra.http.ktor.common.ComputedFields
import dev.gallon.infra.http.ktor.common.Dto

data class BudgetDto(
    val plan: BudgetPlanDto,
    val categories: List<BudgetCategoryDto>,
    val transactions: List<BudgetTransactionDto>,
)

data class BudgetPlanDto(
    override val id: String,
    override val data: BudgetPlan,
    override val computedFields: BudgetPlanComputedFields?
) : Dto<BudgetPlan, BudgetPlanComputedFields>(id, data, null)

fun BudgetPlanDto.withComputedFieldsUsing(allBudgetCategoriesDtos: List<BudgetCategoryDto>): BudgetPlanDto = allBudgetCategoriesDtos
    .sumOf { it.data.amount }
    .let { alreadyBudgeted ->
        copy(
            computedFields = BudgetPlanComputedFields(
                alreadyBudgeted = alreadyBudgeted,
                toBeBudgeted = data.amountAtStart - alreadyBudgeted
            )
        )
    }

data class BudgetPlanComputedFields(
    val alreadyBudgeted: Double,
    val toBeBudgeted: Double,
) : ComputedFields

data class BudgetCategoryDto(
    override val id: String,
    override val data: BudgetCategory,
    override val computedFields: BudgetCategoryComputedFields?,
) : Dto<BudgetCategory, BudgetCategoryComputedFields>(id, data, computedFields)

fun BudgetCategoryDto.withComputedFieldsUsing(allTransactionsDtos: List<BudgetTransactionDto>): BudgetCategoryDto =
    allTransactionsDtos
        .filter { transactionDto -> transactionDto.data.categoryId == id }
        .let { transactionsDtos ->
            val spent = transactionsDtos.sumOf { it.data.amount }

            copy(
                computedFields = BudgetCategoryComputedFields(
                    spent = spent,
                    remaining = data.amount - spent,
                    percentSpent = spent * 100.0 / data.amount,
                ),
            )
        }

data class BudgetCategoryComputedFields(
    val spent: Double,
    val remaining: Double,
    val percentSpent: Double,
) : ComputedFields

data class BudgetTransactionDto(
    override val id: String,
    override val data: BudgetTransaction,
    override val computedFields: BudgetTransactionComputedFields?,
) : Dto<BudgetTransaction, BudgetTransactionComputedFields>(id, data, computedFields)

fun BudgetTransactionDto.withComputedFieldsUsing(
    allBudgetCategoriesDtos: List<BudgetCategoryDto>,
): BudgetTransactionDto =
    copy(
        computedFields = BudgetTransactionComputedFields(
            categoryName = allBudgetCategoriesDtos
                .firstOrNull { categoryDto -> data.categoryId == categoryDto.id }
                ?.data
                ?.name
                ?: "Unknown",
        ),
    )

data class BudgetTransactionComputedFields(
    val categoryName: String,
) : ComputedFields
