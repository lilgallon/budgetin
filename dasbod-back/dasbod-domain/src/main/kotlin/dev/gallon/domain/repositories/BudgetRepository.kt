package dev.gallon.domain.repositories

import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.entities.BudgetTransaction

interface BudgetPlanEntityRepository : EntityRepository<BudgetPlan>

interface BudgetTransactionEntityRepository : EntityRepository<BudgetTransaction>
