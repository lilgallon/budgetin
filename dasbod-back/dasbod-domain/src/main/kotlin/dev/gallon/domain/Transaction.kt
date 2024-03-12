package dev.gallon.domain

import kotlinx.datetime.LocalDate
import java.math.BigDecimal

data class Transaction(
    override val id: String,
    override val metadata: Metadata,
    val date: LocalDate,
    val amount: BigDecimal,
    val category: Reference<BudgetCategory>
) : Entity(id, metadata)
