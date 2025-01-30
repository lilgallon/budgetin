package dev.gallon.domain.entities

import dev.gallon.domain.common.Ref
import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable

@Serializable
data class BudgetPlan(
    val amountAtStart: Double,
    val expectedIncome: Double,
    val startDate: LocalDate,
    val endDate: LocalDate,
) : EntityData

@Serializable
data class BudgetCategory(
    val name: String,
    val amount: Double,
    val budgetPlanRef: Ref<BudgetPlan>,
) : EntityData

@Serializable
data class BudgetTransaction(
    val date: LocalDate,
    val categoryRef: Ref<BudgetCategory>,
    val amount: Double,
    val description: String,
    val status: BudgetTransactionStatus,
) : EntityData

enum class BudgetTransactionStatus {
    PAID,
    PROCESSING,
    PLANNED,
}
