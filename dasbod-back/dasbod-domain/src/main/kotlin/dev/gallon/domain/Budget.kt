package dev.gallon.domain

import kotlinx.datetime.LocalDate
import java.math.BigDecimal

data class BudgetPlan(
    override val id: String,
    override val metadata: Metadata,
    val moneyAtStart: BigDecimal,
    val expectedIncome: BigDecimal,
    val startDate: LocalDate,
    val endDate: LocalDate,
    val categories: List<BudgetCategory>
)  : Entity(id, metadata)

data class BudgetCategory(
    val name: String,
    val amount: BigDecimal
)

data class BudgetTransaction(
    override val id: String,
    override val metadata: Metadata,
    val budgetPlanRef: Reference<BudgetPlan>,
    val date: LocalDate,
    val amount: BigDecimal,
    val description: String
) : Entity(id, metadata)
