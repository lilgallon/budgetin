package dev.gallon.infra.http.ktor.budget

import dev.gallon.domain.entities.BudgetCategory
import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.BudgetTransaction
import dev.gallon.infra.http.ktor.common.ComputedFields
import dev.gallon.infra.http.ktor.common.Dto
import dev.gallon.infra.http.ktor.common.isRefOf

data class BudgetDto(
    val plan: BudgetPlanDto,
    val categories: List<BudgetCategoryDto>,
    val transactions: List<BudgetTransactionDto>,
)

data class BudgetPlanDto(
    override val id: String,
    override val entityData: BudgetPlan,
) : Dto<BudgetPlan, BudgetPlanComputedFields>(id, entityData, null)

class BudgetPlanComputedFields : ComputedFields

data class BudgetCategoryDto(
    override val id: String,
    override val entityData: BudgetCategory,
    override val computedFields: BudgetCategoryComputedFields?,
) : Dto<BudgetCategory, BudgetCategoryComputedFields>(id, entityData, computedFields)

fun BudgetCategoryDto.withComputedFieldsUsing(allTransactionsDtos: List<BudgetTransactionDto>): BudgetCategoryDto =
    allTransactionsDtos
        .filter { transactionDto -> transactionDto.entityData.categoryRef.isRefOf(this) }
        .let { transactionsDtos ->
            val spent = transactionsDtos.sumOf { it.entityData.amount }

            copy(
                computedFields = BudgetCategoryComputedFields(
                    spent = spent,
                    remaining = entityData.amount - spent,
                    percentSpent = spent * 100.0 / entityData.amount,
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
    override val entityData: BudgetTransaction,
    override val computedFields: BudgetTransactionComputedFields?,
) : Dto<BudgetTransaction, BudgetTransactionComputedFields>(id, entityData, computedFields)

fun BudgetTransactionDto.withComputedFieldsUsing(
    allBudgetCategoriesDtos: List<BudgetCategoryDto>,
): BudgetTransactionDto =
    copy(
        computedFields = BudgetTransactionComputedFields(
            categoryName = allBudgetCategoriesDtos
                .firstOrNull { categoryDto -> entityData.categoryRef.isRefOf(categoryDto) }
                ?.entityData
                ?.name
                ?: "Unknown",
        ),
    )

data class BudgetTransactionComputedFields(
    val categoryName: String,
) : ComputedFields
