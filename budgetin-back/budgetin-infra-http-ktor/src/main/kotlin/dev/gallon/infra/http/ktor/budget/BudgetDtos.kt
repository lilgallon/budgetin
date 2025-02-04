package dev.gallon.infra.http.ktor.budget

import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.BudgetTransaction
import dev.gallon.domain.entities.Entity
import dev.gallon.infra.http.ktor.common.ComputedFields
import dev.gallon.infra.http.ktor.common.Dto
import kotlinx.serialization.Serializable

@Serializable
data class BudgetDto(
    val plan: BudgetPlanDto,
    val categories: List<BudgetCategoryDto>,
    val transactions: List<BudgetTransactionDto>,
)

@Serializable
data class BudgetPlanDto(
    override val id: String,
    override val data: BudgetPlan,
    override val computedFields: BudgetPlanComputedFields?
) : Dto<BudgetPlan, BudgetPlanComputedFields>()

@Serializable
data class BudgetPlanComputedFields(
    val alreadyBudgeted: Double,
    val toBeBudgeted: Double,
) : ComputedFields

fun Entity<BudgetPlan>.toDto(): BudgetPlanDto = BudgetPlanDto(
    id = id,
    data = data,
    computedFields = null
)

fun BudgetPlanDto.withComputedFieldsUsing(allBudgetCategories: List<Entity<BudgetCategory>>): BudgetPlanDto = allBudgetCategories
    .sumOf { it.data.amount }
    .let { alreadyBudgeted ->
        copy(
            computedFields = BudgetPlanComputedFields(
                alreadyBudgeted = alreadyBudgeted,
                toBeBudgeted = data.amountAtStart - alreadyBudgeted
            )
        )
    }

@Serializable
data class BudgetCategoryDto(
    override val id: String,
    override val data: BudgetCategory,
    override val computedFields: BudgetCategoryComputedFields?,
) : Dto<BudgetCategory, BudgetCategoryComputedFields>()

@Serializable
data class BudgetCategoryComputedFields(
    val spent: Double,
    val remaining: Double,
    val percentSpent: Double,
) : ComputedFields

fun BudgetCategoryDto.withComputedFieldsUsing(allTransactions: List<Entity<BudgetTransaction>>): BudgetCategoryDto =
    allTransactions
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

fun Entity<BudgetCategory>.toDto(): BudgetCategoryDto = BudgetCategoryDto(
    id = id,
    data = data,
    computedFields = null
)

@Serializable
data class BudgetTransactionDto(
    override val id: String,
    override val data: BudgetTransaction,
    override val computedFields: BudgetTransactionComputedFields?,
) : Dto<BudgetTransaction, BudgetTransactionComputedFields>()

@Serializable
data class BudgetTransactionComputedFields(
    val categoryName: String,
) : ComputedFields

fun BudgetTransactionDto.withComputedFieldsUsing(
    allBudgetCategories: List<Entity<BudgetCategory>>,
): BudgetTransactionDto =
    copy(
        computedFields = BudgetTransactionComputedFields(
            categoryName = allBudgetCategories
                .firstOrNull { categoryDto -> data.categoryId == categoryDto.id }
                ?.data
                ?.name
                ?: "Unknown",
        ),
    )

fun Entity<BudgetTransaction>.toDto(): BudgetTransactionDto = BudgetTransactionDto(
    id = id,
    data = data,
    computedFields = null
)
