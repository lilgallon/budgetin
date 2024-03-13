package dev.gallon.domain.budget

import dev.gallon.domain.common.EntityRepository

interface BudgetPlanEntityRepository : EntityRepository<BudgetPlan>

interface BudgetTransactionEntityRepository : EntityRepository<BudgetTransaction>
