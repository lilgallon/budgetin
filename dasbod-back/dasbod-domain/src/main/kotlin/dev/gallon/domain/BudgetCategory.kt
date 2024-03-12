package dev.gallon.domain

data class BudgetCategory(
    override val id: String,
    override val metadata: Metadata
) : Entity(id, metadata)
