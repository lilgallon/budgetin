package dev.gallon.domain.budget

import dev.gallon.domain.common.EntityData
import dev.gallon.domain.common.Reference
import kotlinx.datetime.LocalDate
import java.math.BigDecimal

data class BudgetPlan(
    val moneyAtStart: BigDecimal,
    val expectedIncome: BigDecimal,
    val startDate: LocalDate,
    val endDate: LocalDate,
    val categories: List<BudgetCategory>
) : EntityData

data class BudgetCategory(
    val name: String,
    val amount: BigDecimal
)

data class BudgetTransaction(
    val budgetPlanRef: Reference<BudgetPlan>,
    val date: LocalDate,
    val amount: BigDecimal,
    val description: String
) : EntityData
