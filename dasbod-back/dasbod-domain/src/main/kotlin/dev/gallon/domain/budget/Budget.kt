package dev.gallon.domain.budget

import dev.gallon.domain.common.EntityData
import dev.gallon.domain.common.Reference
import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable

@Serializable
data class BudgetPlan(
    val moneyAtStart: Float,
    val expectedIncome: Float,
    val startDate: LocalDate,
    val endDate: LocalDate,
    val categories: List<BudgetCategory>
) : EntityData

@Serializable
data class BudgetCategory(
    val name: String,
    val amount: Float
)

@Serializable
data class BudgetTransaction(
    val budgetPlanRef: Reference<BudgetPlan>,
    val date: LocalDate,
    val amount: Float,
    val description: String
) : EntityData
